/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://superhr-backend-production-1471.up.railway.app/api/:path*',
        },
      ]
    },
  }
  

module.exports = nextConfig
