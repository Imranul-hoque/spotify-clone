"use client"

import { Song } from "@/user_types";
import { SongItem } from "./song-item";
import useOnPlay from "@/hooks/use-on-play";

interface PageContentProps {
  songs: Song[];
}

export const PageContent = ({ songs }: PageContentProps) => {

  const onPlay = useOnPlay(songs);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {
              songs.map((song) => (
                <SongItem
                      onClick={(id:string) => onPlay(id)}
                  key={song.id}
                  id={song.id}
                      title={song.title}
                      author={song.author}
                      image={song.image_path}
                      song={song.song_path} />
              ))
      }
    </div>
  );
};
