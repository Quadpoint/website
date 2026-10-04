import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from other devices on the LAN (dev only).
  allowedDevOrigins: ["192.168.1.9"],
};

export default nextConfig;
