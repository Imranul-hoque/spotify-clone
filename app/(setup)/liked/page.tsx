import { getLikedSongs } from "@/actions/get-liked-songs";
import LikedContent from "./_components/like-content";

const Liked = async () => {

    const songs = await getLikedSongs();

    return (
        <div className="p-3 flex flex-col space-y-3">
            <LikedContent songs={songs} />
        </div>
    )
}

export default Liked;