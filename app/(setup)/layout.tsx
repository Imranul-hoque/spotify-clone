import { getSongsByUserId } from "@/actions/get-song-by-userId";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Player } from "./_components/player";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  const user_songs = await getSongsByUserId();
  
  return (
    <div className="h-full flex flex-col gap-x-1">
      <div className="h-full flex items-start gap-x-1">
        <Sidebar songs={user_songs} />
        <main className="flex-1 h-full bg-neutral-800">
          <div className="flex flex-col space-y-2">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
}
