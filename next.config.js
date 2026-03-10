/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache instead of filesystem cache to avoid OneDrive EPERM/OOM issues
      config.cache = { type: 'memory' };
    }
    return config;
  },
}

module.exports = nextConfig
