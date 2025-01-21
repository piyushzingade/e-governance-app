import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatar.iran.liara.run",
      "encrypted-tbn0.gstatic.com",
      "thumbs.dreamstime.com",
    ], // Add the external domains here
  },
};

export default nextConfig;
