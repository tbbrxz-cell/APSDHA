import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CouncilTabs from "@/components/council/CouncilTabs";
import { createPageMetadata } from "@/lib/metadata";
import { supabase } from "@/lib/supabase";
import type { CouncilMember } from "@/types/database";

export const metadata: Metadata = createPageMetadata({
  title: "School Council",
  description:
    "Meet the student leaders of Army Public School (APS) Girls & Boys DHA — Head Boys, Head Girls, House Captains, and Peace Keepers.",
  path: "/council",
});

async function fetchCouncilMembers(): Promise<CouncilMember[]> {
  try {
    const { data, error } = await supabase
      .from("council")
      .select("*")
      .order("display_order", { ascending: true });

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

function getCategories(members: CouncilMember[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const member of members) {
    if (!seen.has(member.category)) {
      seen.add(member.category);
      ordered.push(member.category);
    }
  }

  return ordered;
}

export default async function CouncilPage() {
  const members = await fetchCouncilMembers();
  const categories = getCategories(members);

  return (
    <>
      <PageHero
        title="School Council"
        subtitle="Meet the student leaders who uphold our values and serve the APS DHA community with pride."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CouncilTabs members={members} categories={categories} />
        </div>
      </section>
    </>
  );
}
