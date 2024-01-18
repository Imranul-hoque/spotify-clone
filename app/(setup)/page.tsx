import { getSongs } from "@/actions/get-songs";
import { PageContent } from "./_components/page-content";

const Page = async () => {

    const songs = await getSongs();
    

    return (
        <div>
            <div className="flex flex-col space-y-3 p-3">
                <div>
                    <p className="text-2xl font-bold text-white">Newest Song</p>
                </div>
                <PageContent songs={songs} />
            </div>
        </div>
    )
}

export default Page;