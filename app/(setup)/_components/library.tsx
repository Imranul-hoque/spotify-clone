import { Song } from "@/user_types"
import { LibraryItem } from "./library-item"

interface LibraryProps {
    songs : Song[]
}

export const Library = ({
    songs
}:LibraryProps) => {
    return (
        <div className="flex flex-col space-y-3">
            {
                songs.map((song) => (
                    <LibraryItem
                      key={song.id}  
                        data={song}
                        onClick={(id:string) => {}}
                    />
                ))
            }
        </div>
    )
}