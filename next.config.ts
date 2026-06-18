import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      // Permanently redirect www → apex (canonical: invitehub.in)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.invitehub.in" }],
        destination: "https://invitehub.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
