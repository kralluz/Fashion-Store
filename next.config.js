/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Configuração para múltiplas portas
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'http://localhost:3038/api/:path*'
          : '/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
