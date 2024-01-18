"use client"

import { useModalStore } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";
import { Home, ListMusic, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Song } from "@/user_types";
import { Library } from "./library";


interface SidebarProps {
  songs : Song[]
}

export const Sidebar = ({ songs }:SidebarProps) => {

  const pathname = usePathname();
  const { user } = useUser();
  const { onOpen } = useModalStore((state) => state);
  const { onOpen : onOpenUpload } = useUploadModal((state) => state)

    const handleClick = () => {
        if (!user) {
        return onOpen();
      }
      onOpenUpload()
    };

    const routes = [
      {
        active: pathname !== "/search",
        href: "/",
        icon: Home,
        label: "Home",
      },
      {
        active: pathname === "/search",
        href: "/search",
        icon: Search,
        label: "Search",
      },
    ];


    return (
      <div className="hidden md:block w-[300px] h-full text-white">
        <div className="flex flex-col space-y-2 mb-2 h-full">
          <div className="bg-neutral-800 p-3 w-full h-auto rounded-tr rounded-br">
            {routes.map((route) => (
              <SidebarItem
                key={route.label}
                label={route.label}
                href={route.href}
                icon={route.icon}
                active={route.active}
              />
            ))}
          </div>
          <div className="bg-neutral-800 w-full h-full space-y-2 rounded-tr rounded-br">
            <div className="flex p-4 items-center justify-between text-neutral-400">
              <div className="flex items-center gap-x-2">
                <ListMusic className="h-5 w-5" />
                <p>Your Library</p>
              </div>
              <Plus onClick={handleClick} className="h-5 w-5 cursor-pointer" />
            </div>
            <div className="flex flex-col space-y-3 p-3">
              <Library songs={songs} />
            </div>
          </div>
        </div>
      </div>
    );
}