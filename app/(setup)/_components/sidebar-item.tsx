"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  active,
}: SidebarItemProps) => {
  return (
    <div className="w-full">
      <Link
        href={href}
        className={cn(
          `
             flex 
        flex-row 
        h-auto 
        items-center 
        w-full 
        gap-x-4 
        text-md 
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-2
            `,
          active && "text-white"
        )}
      >
        <Icon className="h-5 w-5" />
        <p className="truncate w-100">{label}</p>
      </Link>
    </div>
  );
};
