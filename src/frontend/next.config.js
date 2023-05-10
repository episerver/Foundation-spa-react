const optiWebsite = require('./website.cjs')
const { withOptimizelyConfig } = require('@optimizely/next-js/config.cjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')(
    {
        enabled: process.env.ANALYZE === 'true'
    }
)

const isProduction = process.env.NODE_ENV == 'production'

/** @type { import('next').NextConfig } */
const nextConfig = withBundleAnalyzer(withOptimizelyConfig({
    reactStrictMode: true,
    generateEtags: true,
    poweredByHeader: false,
    cleanDistDir: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['localhost']
    },
    compiler: {
      styledComponents: {
        displayName: true,
        ssr: true,
        fileName: true,
      },
      removeConsole: isProduction ? {
        exclude: isProduction ? ['error'] : undefined,
      } : false,
    },
    swcMinify: true,

    // Somehow not having this causes issues with SWR when running on a custom server
    experimental: {
      appDir: false,
    },
}, optiWebsite))

if (optiWebsite.localeDomains?.length > 0) {
// @ToDo: Add domain based locale detection
}

console.log("Next.Config.js", nextConfig)
module.exports = nextConfig