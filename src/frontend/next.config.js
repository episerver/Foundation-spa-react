const optiWebsite = require('./website.cjs')
const { withOptimizelyConfig } = require('@optimizely/next-js/config.cjs')

/** @type { import('next').NextConfig } */
const nextConfig = withOptimizelyConfig({
    reactStrictMode: true,
    generateEtags: true,
    poweredByHeader: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['localhost']
    },
    experimental: {
        concurrentFeatures: true,
    },
    swcMinify: true
}, optiWebsite)

if (optiWebsite.localeDomains?.length > 0) {
// @ToDo: Add domain based locale detection
}

module.exports = nextConfig

// Add basic logging to aid in setup
console.log('next.config.js', JSON.stringify(module.exports, null, 2))