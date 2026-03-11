import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import '../styles/globals.scss';
import '@radix-ui/themes/styles.css';
import type { ReactNode } from 'react';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { Theme } from '@radix-ui/themes';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
    display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['600', '700', '800', '900'],
    variable: '--font-barlow-condensed',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'UvO Amsterdam',
    description: 'Welcome to the UvO Amsterdam website!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${inter.variable} ${barlowCondensed.variable}`}
        >
            <body className="body">
                <Theme>
                    <div className="main">
                        <Header />
                        <div className="content">{children}</div>
                        <Footer />
                    </div>
                </Theme>
            </body>
        </html>
    );
}
