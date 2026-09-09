import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

// Initialize the Outfit font with 'swap' for zero-latency text rendering
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

// Premium Metadata Configuration replacing the default Next.js icons
export const metadata = {
  title: 'GenXCode Developers Fund',
  description: 'Support students to participate in Hackathons and help build GenXCode.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  themeColor: '#ffffff', // Adapts mobile browser headers to your brand
  verification: {
    google: '5HPVjTw91SH8m_9XqRz-i7VAIiJrKCDsxU72zgbWGFA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added 'scroll-smooth' for hardware-accelerated, lag-free anchor navigation
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      {/* 
        - antialiased: Crisp font rendering
        - selection: Custom highlight color matching your brand instead of default blue
        - overflow-x-hidden: Prevents horizontal scrolling/wobble on mobile devices
      */}
      <body className="flex flex-col min-h-screen bg-genx-bg text-white antialiased selection:bg-genx-primary/30 selection:text-genx-dark overflow-x-hidden">
        <Navbar />
        
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
        
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}