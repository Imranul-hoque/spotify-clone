"use client";

import { Database } from "@/@types";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface SupabaseProviderProps {
    children : React.ReactNode
}

export const SupabaseProvider = ({children}:SupabaseProviderProps) => {
    const [supabaseClient] = useState(() => createClientComponentClient<Database>())


    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )

}