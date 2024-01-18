/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname : "cbzxvlcwuyqxxovieqtk.supabase.co"
            }
        ]
    }
}

module.exports = nextConfig
