import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
                    {
                        key: 'Clear-Site-Data',
                        value: '"cache"',
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
