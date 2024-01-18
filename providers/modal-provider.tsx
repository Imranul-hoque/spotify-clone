"use client";

import { AuthModal } from "@/components/modal/auth-modal";
import { UploadModal } from "@/components/modal/upload-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    if (!isMounted) {
        return null
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    )
}