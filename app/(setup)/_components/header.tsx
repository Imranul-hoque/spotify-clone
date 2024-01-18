"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Play,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const { onOpen } = useModalStore((state) => state);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const pathname = usePathname();

  const searchPage = pathname === "/search";
  const likePage = pathname === "/liked";

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
    router.refresh();
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-b p-3 pt-5  w-full h-full flex flex-col space-y-3",
        searchPage ? "from-pink-500" : "from-purple-500"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="hidden md:flex items-center gap-x-3">
          <div className="bg-white rounded-full p-2 flex items-center justify-center text-black">
            <ChevronLeft className="cursor-pointer" />
          </div>
          <div className="bg-white rounded-full p-2 flex items-center justify-center text-black">
            <ChevronRight className="cursor-pointer" />
          </div>
        </div>
        <div className="md:hidden flex items-center gap-x-3">
          <div className="bg-white rounded-full p-3 flex items-center justify-center text-black">
            <Home size={18} className="cursor-pointer" />
          </div>
          <div className="bg-white rounded-full p-3 flex items-center justify-center text-black">
            <Search size={18} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          {user ? (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={handleLogout}
                className="bg-white text-black rounded-full px-5 py-0 hover:bg-white"
              >
                Logout
              </Button>
              <div
                onClick={() => router.push("/account")}
                className="flex items-center justify-center rounded-full p-2 bg-white text-black hover:bg-white"
              >
                <User size={20} />
              </div>
            </div>
          ) : (
            <>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-white"
                onClick={onOpen}
              >
                Signup
              </Button>
              <Button
                onClick={onOpen}
                className="bg-white text-black rounded-full px-5 py-0 hover:bg-white"
              >
                Signin
              </Button>
            </>
          )}
        </div>
      </div>

      {!searchPage && (
        <div>
          <div>
            <p className="text-white font-bold text-3xl">welcome Back</p>
          </div>
          {!likePage && (
            <>
              <div className="w-[300px] group bg-white/10 rounded-md pr-3">
                <div className="flex items-center gap-x-3">
                  <div
                    onClick={() => router.push("/liked")}
                    className="cursor-pointer"
                  >
                    <Image
                      src={"/liked.png"}
                      alt="Images"
                      width={55}
                      height={55}
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Liked songs
                    </p>
                  </div>
                  <div className="hidden transition duration-150 group-hover:flex items-center cursor-pointer justify-center p-3 rounded-full bg-purple-500 text-white ml-auto pr-3">
                    <Play size={17} />
                  </div>
                </div>
              </div>
            </>
          )}

          {
            likePage && (
              <div className="flex items-center gap-x-3 pt-4">
                <div>
                  <Image
                    width={55} 
                    height={55} 
                    src={"/liked.png"}
                    alt="Like image"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-muted-foreground">Playlist</p>
                  <h2 className="text-2xl text-white font-bold">Liked Songs</h2>
                </div>
              </div>
            )
          }
        </div>
      )}
      {searchPage && (
        <div>
          <div>
            <p className="text-white font-bold text-3xl">
              welcome to Search page
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
