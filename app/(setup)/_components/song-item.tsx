"use client"

import { useLoadImage } from "@/hooks/use-load-image";
import Image from "next/image";
import { PlayButton } from "./play-button";

interface SongItemProps {
  onClick: (id: string) => void;
  title: string;
  image: string;
  author: string;
  song: string;
  id: string;
}

export const SongItem = ({
  onClick,
  title,
  image,
  author,
  id,
  song,
}: SongItemProps) => {
  const imagePath = useLoadImage(image);

  return (
    <div
      onClick={() => onClick(id)}
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || "/images/music-placeholder.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{title}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          By {author}
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};
