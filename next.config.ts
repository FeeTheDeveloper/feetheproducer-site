import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.feetheproducer.com" }],
        destination: "https://feetheproducer.com/:path*",
        permanent: true,
      },
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
