import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['master-ia-payload.netlify.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)