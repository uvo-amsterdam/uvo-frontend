import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
                source: '/',
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
