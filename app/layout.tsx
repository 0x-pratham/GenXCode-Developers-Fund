import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Initialize the Outfit font
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' // This maps to your Tailwind config
});

export const metadata = {
  title: 'GenXCode Developers Fund',
  description: 'Support students to participate in Hackathons and help build GenXCode.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply the font variable to the root HTML tag
    <html lang="en" className={`${outfit.variable}`}>
      {/* Added 'antialiased' for premium font rendering */}
      <body className="flex flex-col min-h-screen bg-genx-bg text-white antialiased">
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}