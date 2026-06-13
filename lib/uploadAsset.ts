import { supabase } from "./supabase";

export async function uploadAsset(file: File, folder: string): Promise<string> {
  const path = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("school-media")
    .upload(path, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("school-media").getPublicUrl(path);

  return data.publicUrl;
}
