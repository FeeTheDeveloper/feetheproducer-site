import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      { source: "/releases", destination: "/streaming", permanent: true },
      {
        source: "/releases/:slug",
        destination: "/streaming/:slug",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
