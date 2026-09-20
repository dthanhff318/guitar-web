import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three.js ships untranspiled ESM helpers used by drei — let Next bundle them.
  transpilePackages: ["three"],
};

export default nextConfig;
