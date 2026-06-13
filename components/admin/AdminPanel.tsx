"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import confetti from "canvas-confetti";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { uploadAsset } from "@/lib/uploadAsset";
import { supabase } from "@/lib/supabase";
import { cn, slugify, sanitizeText } from "@/lib/utils";

/**
 * Secret admin panel — invisible trigger, no UI hint shown.
 * Open sequence: type a → p → s → a → m (each within 2 seconds of the last).
 */

const COUNCIL_CATEGORIES = [
  "Head Boys",
  "Head Girls",
  "House Captains",
  "Peace Keepers",
] as const;

const councilSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  category: z.string().min(1, "Category is required"),
});

const newsSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type CouncilFormData = z.infer<typeof councilSchema>;
type NewsFormData = z.infer<typeof newsSchema>;

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ImageDropzoneProps {
  folder: string;
  imageUrl: string | null;
  preview: string | null;
  uploading: boolean;
  onUploadStart: () => void;
  onUploadSuccess: (url: string, preview: string) => void;
  onUploadError: () => void;
  onClear: () => void;
}

function ImageDropzone({
  folder,
  imageUrl,
  preview,
  uploading,
  onUploadStart,
  onUploadSuccess,
  onUploadError,
  onClear,
}: ImageDropzoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const localPreview = URL.createObjectURL(file);
      onUploadStart();

      try {
        const url = await uploadAsset(file, folder);
        onUploadSuccess(url, localPreview);
      } catch (err) {
        console.error("Image upload failed:", err);
        URL.revokeObjectURL(localPreview);
        onUploadError();
      }
    },
    [folder, onUploadStart, onUploadSuccess, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      {preview || imageUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <div className="relative aspect-video w-full bg-army/20">
            <Image
              src={preview ?? imageUrl!}
              alt="Upload preview"
              fill
              className="object-cover"
              sizes="400px"
              unoptimized={!!preview?.startsWith("blob:")}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/70">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            )}
          </div>
          {!uploading && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2 top-2 rounded-lg bg-charcoal/80 p-1.5 text-white/70 hover:text-gold"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-charcoal/50 px-4 py-10 transition-colors",
            isDragActive && "border-gold/40 bg-gold/5",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-white/40" />
              <p className="text-sm text-white/60">
                Drag & drop an image, or click to browse
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors: ["#D4AF37", "#1A4D2E", "#ffffff"],
  });
}

export default function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const router = useRouter();

  const [councilImageUrl, setCouncilImageUrl] = useState<string | null>(null);
  const [councilPreview, setCouncilPreview] = useState<string | null>(null);
  const [councilUploading, setCouncilUploading] = useState(false);
  const [councilSubmitting, setCouncilSubmitting] = useState(false);

  const [newsImageUrl, setNewsImageUrl] = useState<string | null>(null);
  const [newsPreview, setNewsPreview] = useState<string | null>(null);
  const [newsUploading, setNewsUploading] = useState(false);
  const [newsSubmitting, setNewsSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const councilForm = useForm<CouncilFormData>({
    resolver: zodResolver(councilSchema),
    defaultValues: { name: "", role: "", category: "" },
  });

  const newsForm = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      content: "",
    },
  });

  const newsTitle = newsForm.watch("title");

  useEffect(() => {
    if (!slugTouched && newsTitle) {
      newsForm.setValue("slug", slugify(newsTitle));
    }
  }, [newsTitle, slugTouched, newsForm]);

  const resetCouncilForm = () => {
    councilForm.reset();
    setCouncilImageUrl(null);
    if (councilPreview) URL.revokeObjectURL(councilPreview);
    setCouncilPreview(null);
  };

  const resetNewsForm = () => {
    newsForm.reset({
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      content: "",
    });
    setSlugTouched(false);
    setNewsImageUrl(null);
    if (newsPreview) URL.revokeObjectURL(newsPreview);
    setNewsPreview(null);
  };

  const onCouncilSubmit = async (data: CouncilFormData) => {
    if (!councilImageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    setCouncilSubmitting(true);
    try {
      const { data: maxRow, error: maxError } = await supabase
        .from("council")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (maxError) throw maxError;

      const nextOrder = (maxRow?.display_order ?? 0) + 1;

      const { error } = await supabase.from("council").insert({
        name: sanitizeText(data.name),
        role: sanitizeText(data.role),
        category: sanitizeText(data.category),
        image_url: councilImageUrl,
        display_order: nextOrder,
      });

      if (error) throw error;

      toast.success("Council member added!");
      fireConfetti();
      resetCouncilForm();
      router.refresh();
    } catch (err) {
      console.error("Council insert failed:", err);
      toast.error("Failed to add council member. Please try again.");
    } finally {
      setCouncilSubmitting(false);
    }
  };

  const onNewsSubmit = async (data: NewsFormData) => {
    setNewsSubmitting(true);
    try {
      const { error } = await supabase.from("news_and_events").insert({
        title: sanitizeText(data.title),
        slug: slugify(sanitizeText(data.slug)),
        date: data.date,
        description: sanitizeText(data.description),
        content: sanitizeText(data.content),
        image_url: newsImageUrl,
      });

      if (error) throw error;

      toast.success("News / Event published!");
      fireConfetti();
      resetNewsForm();
      router.refresh();
    } catch (err) {
      console.error("News insert failed:", err);
      toast.error("Failed to publish news/event. Please try again.");
    } finally {
      setNewsSubmitting(false);
    }
  };

  const councilBusy = councilUploading || councilSubmitting;
  const newsBusy = newsUploading || newsSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-3xl flex-col overflow-hidden border-white/10 bg-charcoal/95 p-0 backdrop-blur-xl sm:max-w-4xl">
        <DialogHeader className="border-b border-white/10 px-6 py-5">
          <DialogTitle className="text-gold">Admin Panel</DialogTitle>
          <DialogDescription>
            Add council members and news articles directly to the site.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <Tabs defaultValue="council">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="council" className="flex-1 sm:flex-none">
                Council Member
              </TabsTrigger>
              <TabsTrigger value="news" className="flex-1 sm:flex-none">
                News / Event
              </TabsTrigger>
            </TabsList>

            <TabsContent value="council">
              <form
                onSubmit={councilForm.handleSubmit(onCouncilSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="council-name">Name</Label>
                    <Input
                      id="council-name"
                      placeholder="Student name"
                      {...councilForm.register("name")}
                    />
                    {councilForm.formState.errors.name && (
                      <p className="text-xs text-red-400">
                        {councilForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="council-role">Role</Label>
                    <Input
                      id="council-role"
                      placeholder="e.g. Head Boy"
                      {...councilForm.register("role")}
                    />
                    {councilForm.formState.errors.role && (
                      <p className="text-xs text-red-400">
                        {councilForm.formState.errors.role.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="council-category">Category</Label>
                  <Select
                    id="council-category"
                    defaultValue=""
                    {...councilForm.register("category")}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {COUNCIL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                  {councilForm.formState.errors.category && (
                    <p className="text-xs text-red-400">
                      {councilForm.formState.errors.category.message}
                    </p>
                  )}
                </div>

                <ImageDropzone
                  folder="council"
                  imageUrl={councilImageUrl}
                  preview={councilPreview}
                  uploading={councilUploading}
                  onUploadStart={() => setCouncilUploading(true)}
                  onUploadSuccess={(url, preview) => {
                    setCouncilImageUrl(url);
                    setCouncilPreview(preview);
                    setCouncilUploading(false);
                  }}
                  onUploadError={() => {
                    setCouncilUploading(false);
                    toast.error("Image upload failed");
                  }}
                  onClear={() => {
                    setCouncilImageUrl(null);
                    if (councilPreview) URL.revokeObjectURL(councilPreview);
                    setCouncilPreview(null);
                  }}
                />

                <Button type="submit" variant="gold" disabled={councilBusy}>
                  {councilSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Council Member"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="news">
              <form
                onSubmit={newsForm.handleSubmit(onNewsSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="news-title">Title</Label>
                  <Input
                    id="news-title"
                    placeholder="Article title"
                    {...newsForm.register("title")}
                  />
                  {newsForm.formState.errors.title && (
                    <p className="text-xs text-red-400">
                      {newsForm.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="news-slug">Slug</Label>
                  <Input
                    id="news-slug"
                    placeholder="url-friendly-slug"
                    {...newsForm.register("slug", {
                      onChange: () => setSlugTouched(true),
                    })}
                  />
                  <p className="text-xs text-white/40">
                    Preview: /news-events/
                    {newsForm.watch("slug") || "your-slug"}
                  </p>
                  {newsForm.formState.errors.slug && (
                    <p className="text-xs text-red-400">
                      {newsForm.formState.errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="news-date">Date</Label>
                  <Input
                    id="news-date"
                    type="date"
                    {...newsForm.register("date")}
                  />
                  {newsForm.formState.errors.date && (
                    <p className="text-xs text-red-400">
                      {newsForm.formState.errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="news-description">Short Description</Label>
                  <Textarea
                    id="news-description"
                    rows={3}
                    placeholder="Brief summary for cards and search..."
                    {...newsForm.register("description")}
                  />
                  {newsForm.formState.errors.description && (
                    <p className="text-xs text-red-400">
                      {newsForm.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="news-content">Full Content</Label>
                  <Textarea
                    id="news-content"
                    rows={8}
                    placeholder="Full article body..."
                    {...newsForm.register("content")}
                  />
                  {newsForm.formState.errors.content && (
                    <p className="text-xs text-red-400">
                      {newsForm.formState.errors.content.message}
                    </p>
                  )}
                </div>

                <ImageDropzone
                  folder="news"
                  imageUrl={newsImageUrl}
                  preview={newsPreview}
                  uploading={newsUploading}
                  onUploadStart={() => setNewsUploading(true)}
                  onUploadSuccess={(url, preview) => {
                    setNewsImageUrl(url);
                    setNewsPreview(preview);
                    setNewsUploading(false);
                  }}
                  onUploadError={() => {
                    setNewsUploading(false);
                    toast.error("Image upload failed");
                  }}
                  onClear={() => {
                    setNewsImageUrl(null);
                    if (newsPreview) URL.revokeObjectURL(newsPreview);
                    setNewsPreview(null);
                  }}
                />

                <Button type="submit" variant="gold" disabled={newsBusy}>
                  {newsSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "Publish News / Event"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
