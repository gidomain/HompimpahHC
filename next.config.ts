import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/HompimpahHC',
  assetPrefix: '/HompimpahHC/',
  trailingSlash: true,
};

export default nextConfig;
