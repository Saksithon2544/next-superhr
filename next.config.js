/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://superhr-backend-production-1471.up.railway.app/api/:path*',
        },

        // {
        //   source: '/api/:path*',
        //   destination: 'http://localhost:5000/api/:path*',
        // },
      ]
    },
  }
  

module.exports = nextConfig
