import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' && { exclude: ['error', 'warn'] },
  },
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  env: {},
};

export default nextConfig;
