"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CouncilMember } from "@/types/database";

interface CouncilCardProps {
  member: CouncilMember;
  index?: number;
}

export default function CouncilCard({ member, index = 0 }: CouncilCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden border-white/10 card-interactive">
        <div className="relative aspect-[4/3] overflow-hidden bg-army/20">
          {member.image_url ? (
            <Image
              src={member.image_url}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Users className="h-12 w-12 text-white/20" />
            </div>
          )}
        </div>
        <CardContent className="p-4 sm:p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {member.name}
            </h3>
            <Badge variant="gold" className="shrink-0">
              {member.category}
            </Badge>
          </div>
          <p className="text-sm text-white/60">{member.role}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
