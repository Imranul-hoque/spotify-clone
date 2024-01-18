"use client"

import { Play } from "lucide-react";

export const PlayButton = () => {
  return (
    <button
      className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-purple-500 
        p-3 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
    >
      <Play size={18} className="text-black " />
    </button>
  );
};


