import { supabase } from "@/lib/supabase";
import type { CouncilMember } from "@/types/database";
import CouncilPreview from "./CouncilPreview";

async function fetchCouncilMembers(): Promise<CouncilMember[]> {
  try {
    const { data, error } = await supabase
      .from("council")
      .select("*")
      .order("display_order", { ascending: true })
      .limit(6);

    if (error) {
      console.error("Failed to fetch council members:", error.message);
      return [];
    }

    return (data as CouncilMember[]) ?? [];
  } catch (err) {
    console.error("Failed to fetch council members:", err);
    return [];
  }
}

export default async function CouncilPreviewSection() {
  const members = await fetchCouncilMembers();
  return <CouncilPreview members={members} />;
}
