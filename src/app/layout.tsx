import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BlueRAG',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={` ${inter.variable}`}>{children}</body>
    </html>
  );
}
