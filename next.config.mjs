import { withPayload } from '@payloadcms/next/withPayload'

// Build S3 hostname from environment variables
const AWS_BUCKET = process.env.AWS_BUCKET || ''
const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-2'

const remotePatterns = [
  // Wildcard fallback for any S3 bucket (safety net)
  {
    protocol: 'https',
    hostname: '*.s3.*.amazonaws.com',
    pathname: '/media/**',
  },
  {
    protocol: 'https',
    hostname: '*.s3.amazonaws.com',
    pathname: '/media/**',
  },
]

if (AWS_BUCKET) {
  remotePatterns.push(
    {
      protocol: 'https',
      hostname: `${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com`,
      pathname: '/media/**',
    },
    {
      protocol: 'https',
      hostname: `${AWS_BUCKET}.s3.amazonaws.com`,
      pathname: '/media/**',
    },
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 week — S3 content is immutable (new uploads get new filenames)
    minimumCacheTTL: 604800,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // You should fix these and set this to false for release.
    ignoreDuringBuilds: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
