'use client';
import { motion, Variants } from 'framer-motion';
import { Code2, ShieldCheck, Sparkles, Medal, Terminal } from 'lucide-react';

// Engineered 3D Perspective Reveal with snappier mechanical easing
const staggerContainer: Variants = {
  hidden: { opacity: 0, perspective: 1200 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};

const perspectiveVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, rotateX: -8, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function AboutWhyDonate() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="mb-24 lg:mb-32 relative z-20"
    >
      <motion.div variants={perspectiveVariant} className="text-center mb-16 relative">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark tracking-tight">
          Why Your Contribution Matters
        </h2>
      </motion.div>
      
      {/* Engineered Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Module 1: Direct Impact (Wide Anchor - 7 Cols) */}
        <motion.div 
          variants={perspectiveVariant} 
          className="lg:col-span-7 bg-white/80 backdrop-blur-3xl border border-white rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(34,7,73,0.03)] hover:shadow-[0_20px_60px_rgba(34,7,73,0.08)] transition-all duration-500 relative overflow-hidden group transform-gpu will-change-transform flex flex-col justify-center"
        >
          {/* Subtle Data-Grid Backdrop */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#220749 1px, transparent 1px), linear-gradient(90deg, #220749 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          </div>
          
          {/* Reactive Hover Bloom */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100 group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-500 shrink-0">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold font-heading text-genx-dark mb-2">
                100% Direct Impact
              </h3>
              <p className="text-gray-500 font-body text-base font-medium leading-relaxed max-w-md">
                Zero overhead. Every single rupee goes directly into the fund, meticulously tracked and instantly deployed to students shipping code.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module 2: Elevating Engineering (Dark Console - 5 Cols) */}
        <motion.div 
          variants={perspectiveVariant} 
          className="lg:col-span-5 bg-genx-dark border border-genx-dark/80 rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(34,7,73,0.2)] transition-all duration-500 relative overflow-hidden group transform-gpu will-change-transform flex flex-col justify-between"
        >
          {/* Terminal/IDE Decorative Accent */}
          <div className="absolute top-8 right-8 text-white/10 group-hover:text-genx-accent/30 transition-colors duration-500">
            <Terminal size={24} strokeWidth={2} />
          </div>

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-genx-accent/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/10 backdrop-blur-md group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-500 relative z-10">
            <Code2 size={28} strokeWidth={1.5} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold font-heading text-white mb-3 tracking-tight">
              Elevating Engineering
            </h3>
            <p className="text-gray-300 font-body text-base font-medium leading-relaxed">
              You aren't just giving money; you are funding high-quality software and investing in tomorrow's lead engineers.
            </p>
          </div>
        </motion.div>

        {/* Module 3: Earn Your Legacy (Full Width Panoramic - 12 Cols) */}
        <motion.div 
          variants={perspectiveVariant} 
          className="lg:col-span-12 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-3xl border border-white/80 rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(34,7,73,0.04)] hover:shadow-[0_20px_60px_rgba(34,7,73,0.08)] transition-all duration-500 relative overflow-hidden group transform-gpu will-change-transform flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Subtle warm glow for the legacy aspect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-400/5 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner border border-amber-200/60 group-hover:-translate-y-2 transition-all duration-500 shrink-0">
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold font-heading text-genx-dark tracking-tight">
                Earn Your Legacy
              </h3>
            </div>
            <p className="text-gray-500 font-body text-lg font-medium leading-relaxed">
              Contributors are forever immortalized on our public Hall of Fame. Climb the ranks, achieve Diamond Tier, and be recognized globally as a true patron of the developer ecosystem.
            </p>
          </div>

          {/* Elegant Metallic Legacy Plaque */}
          <div className="w-full md:w-auto shrink-0 relative z-10 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-white/60 border border-white shadow-[0_10px_30px_rgba(34,7,73,0.06),inset_0_2px_4px_rgba(255,255,255,1)] rounded-[2rem] overflow-hidden group-hover:-translate-y-1 transition-transform duration-500">
             {/* Diagonal Shimmer Effect */}
             <motion.div 
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 opacity-80"
             />
             
             <Medal size={44} className="text-amber-500 drop-shadow-[0_4px_8px_rgba(245,158,11,0.3)] mb-4" strokeWidth={1.5} />
             <span className="font-heading font-bold text-gray-400 tracking-[0.25em] uppercase text-xs mb-1">
               Hall of Fame
             </span>
             <span className="font-heading font-bold text-genx-dark text-xl tracking-tight">
               Diamond Tier
             </span>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
}