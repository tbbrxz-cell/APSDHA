import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { CouncilMember } from "@/types/database";
import CouncilCard from "./CouncilCard";

interface CouncilGridProps {
  members: CouncilMember[];
  className?: string;
}

export function CouncilGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-white/10">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CouncilGrid({ members, className }: CouncilGridProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-20 text-center">
        <Users className="mb-3 h-10 w-10 text-white/30" />
        <p className="text-sm text-white/50">
          No members in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {members.map((member, index) => (
        <CouncilCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );
}
