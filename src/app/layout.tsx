import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.scss';
import React, { type ReactNode } from 'react';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="main">
                    <Header />
                    <div className="content">
                        {children}
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
