import './globals.css';
import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Spogmai – Wear The Legacy',
  description: 'Premium luxury fashion for the modern gentleman.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Spogmai – Wear The Legacy',
    description: 'Premium luxury fashion for the modern gentleman.',
    images: ['/og-image.jpg'],
    url: 'https://spogmai.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-surface text-primary-text">
      <body className="font-body antialiased">
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
