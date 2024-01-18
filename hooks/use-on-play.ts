import { Song } from "@/user_types";

import {usePlayer} from "./use-player";
import { useModalStore } from "./use-modal-store";
import { useUser } from "./use-user";


const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useModalStore();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
