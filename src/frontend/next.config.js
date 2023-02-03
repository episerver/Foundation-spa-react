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
      removeConsole: isProduction ? {
        exclude: isProduction ? ['error'] : undefined,
      } : false,
    },
    swcMinify: true,
}, optiWebsite))

if (optiWebsite.localeDomains?.length > 0) {
// @ToDo: Add domain based locale detection
}

module.exports = nextConfig

// Add basic logging to aid in setup
console.log('next.config.js', JSON.stringify(module.exports, null, 2))