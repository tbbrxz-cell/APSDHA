"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CouncilMember } from "@/types/database";
import CouncilGrid from "./CouncilGrid";

interface CouncilTabsProps {
  members: CouncilMember[];
  categories: string[];
}

export default function CouncilTabs({ members, categories }: CouncilTabsProps) {
  const tabs = ["All", ...categories];

  return (
    <Tabs defaultValue="All" className="w-full">
      <div className="overflow-x-auto pb-1">
        <TabsList className="inline-flex h-auto min-h-10 w-max flex-wrap gap-1 p-1">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="px-4 py-2">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => {
        const filtered =
          tab === "All"
            ? members
            : members.filter((member) => member.category === tab);

        return (
          <TabsContent key={tab} value={tab} className="mt-8">
            <CouncilGrid members={filtered} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
