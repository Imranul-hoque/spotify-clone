import { getSongsByTitle } from "@/actions/get-song-by-title";
import {SearchInput} from "./_components/search-input";
import SearchContent from "./_components/search-content";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="flex flex-col space-y-2 px-10 py-5">
            <SearchInput />
            <SearchContent songs={songs} />
        </div>
    )
}

export default Search