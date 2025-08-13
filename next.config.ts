import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "picsum.photos",
      "example.com",
      "i.ibb.co",
    ],
  },
  async redirects() {
    return [
      {
        source: "/listings",
        destination: "/properties",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
