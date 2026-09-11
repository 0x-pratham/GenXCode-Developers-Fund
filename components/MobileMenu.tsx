'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ArrowRight, LogOut, ChevronRight, ShieldAlert } from 'lucide-react';

interface MobileMenuProps {
  user: any;
  isAdmin: boolean;
  handleLogout: () => void;
}

const menuVariants: Variants = {
  closed: { 
    opacity: 0, 
    y: "-10%",
    transition: { duration: 0.3, ease: "easeInOut" } 
  },
  open: { 
    opacity: 1, 
    y: "0%",
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1], 
      staggerChildren: 0.1, 
      delayChildren: 0.1 
    } 
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export default function MobileMenu({ user, isAdmin, handleLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scrolling when the menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center justify-end flex-1 relative z-[110]">
      {/* Premium tactile trigger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 bg-gray-50 border border-gray-200 rounded-full text-genx-dark shadow-sm active:scale-95 transition-all"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-[5.5rem] w-screen h-[calc(100vh-5.5rem)] bg-white flex flex-col p-8 z-[100] border-t border-gray-100 overflow-hidden"
          >
            {/* Ambient Interior Glow */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-genx-primary/15 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Premium Native-App Style Navigation List */}
            <div className="flex flex-col mt-4 relative z-10">
              <motion.div variants={itemVariants}>
                <Link 
                  href="/about" 
                  onClick={() => setIsOpen(false)} 
                  className="group flex items-center justify-between py-6 border-b border-gray-100"
                >
                  <span className="text-4xl font-heading font-bold text-genx-dark group-active:text-genx-primary transition-colors tracking-tight">
                    About
                  </span>
                  <ChevronRight size={28} className="text-gray-300 group-active:text-genx-primary transition-colors" />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link 
                  href="/hall-of-fame" 
                  onClick={() => setIsOpen(false)} 
                  className="group flex items-center justify-between py-6 border-b border-gray-100"
                >
                  <span className="text-4xl font-heading font-bold text-genx-dark group-active:text-genx-primary transition-colors tracking-tight">
                    Hall of Fame
                  </span>
                  <ChevronRight size={28} className="text-gray-300 group-active:text-genx-primary transition-colors" />
                </Link>
              </motion.div>

              {user && (
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="group flex items-center justify-between py-6 border-b border-gray-100"
                  >
                    <span className="text-4xl font-heading font-bold text-genx-dark group-active:text-genx-primary transition-colors tracking-tight">
                      Dashboard
                    </span>
                    <ChevronRight size={28} className="text-gray-300 group-active:text-genx-primary transition-colors" />
                  </Link>
                </motion.div>
              )}

              {/* Elevated Admin Route (Light Red Pill) */}
              {isAdmin && (
                <motion.div variants={itemVariants} className="pt-6">
                  <Link 
                    href="/admin" 
                    onClick={() => setIsOpen(false)} 
                    className="group flex items-center justify-between py-4 px-6 bg-red-50 border border-red-100 rounded-full active:bg-red-600 active:border-red-600 transition-all duration-300 shadow-sm"
                  >
                    <span className="text-2xl md:text-3xl font-heading font-bold text-red-600 group-active:text-white transition-colors tracking-tight flex items-center gap-3">
                      <ShieldAlert size={28} strokeWidth={2.5} />
                      Admin Panel
                    </span>
                    <ChevronRight size={28} className="text-red-400 group-active:text-white transition-colors" />
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Bottom Pinned Auth Actions */}
            <motion.div variants={itemVariants} className="w-full mt-auto pt-10 pb-6 relative z-10">
               {user ? (
                  <form action={handleLogout}>
                    <button 
                      type="submit" 
                      onClick={() => setIsOpen(false)} 
                      className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-lg border border-red-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                      <LogOut size={20} /> Secure Logout
                    </button>
                  </form>
               ) : (
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)} 
                    className="w-full py-4 rounded-2xl bg-genx-dark text-white font-bold text-lg flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(34,7,73,0.2)] active:scale-95 transition-transform"
                  >
                    Become a Patron <ArrowRight size={20} />
                  </Link>
               )}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}