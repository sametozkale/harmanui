import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
