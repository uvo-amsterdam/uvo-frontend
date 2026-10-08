import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'directus.uvo-amsterdam.cloud',
                pathname: '/assets/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'accept',
                        value: '.*text/html.*',
                    },
                ],
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
