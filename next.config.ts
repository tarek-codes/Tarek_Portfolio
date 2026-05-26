import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.frjh4-1.fna.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;



