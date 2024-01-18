"use client";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/use-modal-store';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';

export const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { isOpen, onClose } = useModalStore((state) => state);

    const { user } = useUser();

    useEffect(() => {
        if (user) {
            return onClose()
        }
    },[onClose, user])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center text-3xl text-white'>
                        Welcome back
                    </DialogTitle>
                    <DialogDescription className='text-sm text-center text-muted-foreground'>
                        Login to your account 
                    </DialogDescription>
                </DialogHeader>
                <Auth
                    providers={["github"]}
                    magicLink
                    theme='dark'
                    supabaseClient={supabaseClient}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand : "#404040"
                                }
                            }
                        }
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}