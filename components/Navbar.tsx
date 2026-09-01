import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const handleLogout = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/40 backdrop-blur-3xl border-b border-white/60 shadow-[0_4px_40px_rgba(34,7,73,0.03),inset_0_-1px_0_rgba(255,255,255,0.4)] transition-all antialiased">
      <div className="max-w-7xl mx-auto px-6 h-[5.5rem] flex items-center justify-between relative">
        
        {/* Left: Unboxed Brand Identity */}
        <div className="flex-1 flex justify-start relative z-[110]">
          <Link href="/" className="group flex items-center gap-3 md:gap-4 active:scale-[0.98] transition-all duration-500 ease-out">
            <Image 
              src="/icon.svg" 
              alt="GenXCode Logo" 
              width={52} 
              height={52} 
              className="drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-lg group-hover:-rotate-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-genx-dark via-genx-primary to-slate-400 group-hover:to-slate-200 transition-all duration-700">
              Dev Fund
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation (Hidden on Mobile) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center p-1.5 bg-gray-100/50 backdrop-blur-2xl border border-gray-200/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03),0_2px_15px_rgba(255,255,255,0.5)] rounded-full">
          <Link href="/about" className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-genx-dark hover:bg-white hover:shadow-[0_2px_12px_rgba(34,7,73,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-95 transition-all duration-300 ease-out">
            About
          </Link>
          <Link href="/hall-of-fame" className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-genx-dark hover:bg-white hover:shadow-[0_2px_12px_rgba(34,7,73,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-95 transition-all duration-300 ease-out">
            Hall of Fame
          </Link>
          {user && (
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-genx-dark hover:bg-white hover:shadow-[0_2px_12px_rgba(34,7,73,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-95 transition-all duration-300 ease-out">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right: Desktop Auth Actions (Hidden on Mobile) */}
        <div className="flex-1 hidden lg:flex justify-end relative z-[110]">
          {user ? (
            <form action={handleLogout}>
              <Button type="submit" variant="light" className="text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                Logout
              </Button>
            </form>
          ) : (
            <Button href="/login" variant="light" className="shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              Login / Register
            </Button>
          )}
        </div>

        {/* Mobile Navigation Trigger (Visible ONLY on Mobile) */}
        <MobileMenu user={user} handleLogout={handleLogout} />

      </div>
    </nav>
  );
}