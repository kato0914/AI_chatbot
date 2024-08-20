/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production'
      ? 'https://ai-chatbot-dw16.vercel.app/api/chat'
      : 'http://localhost:8787/api/chat',
  },
}

module.exports = nextConfig