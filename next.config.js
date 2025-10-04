/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    output: 'export',
    basePath: '/kruuk-site',
    images: { 
        unoptimized: true 
    }
}

module.exports = nextConfig