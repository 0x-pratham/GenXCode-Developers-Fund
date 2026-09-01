'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

const staggerContainer: Variants = {
  hidden: { opacity: 0, perspective: 1200 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};

const perspectiveVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: -8, filter: 'blur(12px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

export default function AboutCTA() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative z-20"
    >
      <motion.div 
        variants={perspectiveVariant}
        className="text-center bg-genx-dark rounded-[2.5rem] lg:rounded-[3rem] p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-[0_30px_80px_rgba(34,7,73,0.3)] transform-gpu will-change-transform group border border-white/5"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <motion.div 
            animate={{ y: [0, 40], x: [0, 40] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(94,35,150,0.4)_0%,transparent_60%)] blur-[80px] pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-genx-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-8">
            <div className="absolute inset-[-15px] border border-dashed border-white/20 rounded-full" />
            <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl backdrop-blur-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)]">
              <Rocket size={36} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 leading-[1.1] max-w-3xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 pb-2">
            Ready to write the <br className="hidden sm:block" /> next chapter?
          </h2>
          
          <p className="text-gray-300 font-body text-lg max-w-xl mx-auto mb-12 font-medium leading-relaxed">
            Join the ranks of elite developers supporting the GenXCode movement. Your contribution pushes the entire industry forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
            <Link 
              href="/login" 
              className="relative group overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 bg-white text-genx-dark shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] hover:-translate-y-1"
            >
              <motion.div 
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
              />
              <span className="relative z-10">Make a Donation</span>
            </Link>

            <Link 
              href="/hall-of-fame" 
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
            >
              View the Hall of Fame
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}