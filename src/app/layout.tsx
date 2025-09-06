import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LocationTracker - Phone Number Location Demo',
  description: 'Educational demonstration of phone number location tracking concepts with privacy and legal information.',
  keywords: 'location tracking, phone number, privacy, educational, demo, legal requirements',
  authors: [{ name: 'LocationTracker Demo' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="h-full antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}