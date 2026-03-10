import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tr.rbxcdn.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            }
        ],
    },
};

export default nextConfig;
