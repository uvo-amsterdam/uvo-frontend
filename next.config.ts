import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
            ...(process.env.NODE_ENV === 'production'
                ? [
                      {
                          source: '/_next/static/:path*',
                          headers: [
                              {
                                  key: 'Cache-Control',
                                  value: 'public, max-age=31536000, immutable',
                              },
                          ],
                      },
                  ]
                : []),
        ];
    },
};

export default nextConfig;
