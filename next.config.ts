import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
        protocol: "https",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.220", "192.168.100.222", "127.0.0.1"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
