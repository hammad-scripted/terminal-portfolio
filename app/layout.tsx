import type { Metadata } from 'next';
import { DM_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const geistSans = Plus_Jakarta_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = DM_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hammad-scripted.github.io/terminal-portfolio/'),
  title: 'Mohammad Hammad Ansari | Full Stack Developer',
  description:
    'The terminal-styled portfolio of Mohammad Hammad Ansari, a full-stack developer building dependable interfaces, APIs, and production systems.',
  keywords: [
    'Mohammad Hammad Ansari',
    'Full Stack Developer',
    'Next.js Developer',
    'Java Developer',
    'React Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Mohammad Hammad Ansari' }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Mohammad Hammad Ansari | Portfolio OS',
    description: 'Full Stack Developer building dependable digital products and scalable systems.',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mohammad Hammad Ansari - Full Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Hammad Ansari | Portfolio OS',
    description: 'Full Stack Developer building dependable digital products and scalable systems.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
