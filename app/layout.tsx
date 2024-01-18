import { SupabaseProvider } from "@/providers/supabase-provider";
import { UserProvider } from "@/providers/user-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "New Music PlatForm",
  icons: [
    {
      href: "/logo.svg",
      url: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Toaster />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
