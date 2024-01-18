import { Song } from '@/user_types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data : SessionData, error : SessionError  } = await supabase.auth.getSession()

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", SessionData.session?.user.id)
      .order("created_at", { ascending: false })
    if (error) {
        console.log(error.message)
    }

    return (data as any) || [];
}