import type { Metadata } from 'next';
import '../styles/globals.scss';
import '@radix-ui/themes/styles.css';
import type { ReactNode } from 'react';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { Theme } from '@radix-ui/themes';

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
        <html lang="en">
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
