import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Buyify - Buy and buy again!',
  description: 'Buyify - The best place to buy and buy again! Showcasing an ecommerce site.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col bg-white`}>
        <Navbar />
        <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
      </body>
    </html>
  );
}
