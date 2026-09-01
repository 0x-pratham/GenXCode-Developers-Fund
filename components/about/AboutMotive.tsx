'use client';
import { motion, Variants } from 'framer-motion';
import { Target, Layers, Activity } from 'lucide-react'; // Removed unused Zap

// Engineered 3D Perspective Reveal
const staggerContainer: Variants = {
  hidden: { opacity: 0, perspective: 1000 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
  }
};

const perspectiveVariant: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95, rotateX: -15, filter: 'blur(12px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function AboutMotive() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="relative z-30 mt-12 lg:-mt-16 mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
    >
      {/* Module 1: The Core Motive (Large Anchor Card) */}
      <motion.div 
        variants={perspectiveVariant}
        className="lg:col-span-8 lg:row-span-2 bg-white/80 backdrop-blur-3xl border border-white rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_60px_rgba(34,7,73,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] p-8 md:p-10 lg:p-12 relative overflow-hidden group transform-gpu will-change-transform hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center"
      >
        {/* Kinetic Blueprint Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#5e2396 1px, transparent 1px), linear-gradient(90deg, #5e2396 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <motion.div 
            animate={{ y: [0, 40], x: [0, 40] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-genx-primary/10 to-transparent rounded-full blur-3xl -z-10 group-hover:from-genx-primary/20 transition-colors duration-700"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 lg:mb-10">
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-genx-soft rounded-2xl flex items-center justify-center text-genx-primary border border-genx-primary/10 shadow-inner shrink-0"
          >
            <Target size={32} strokeWidth={1.5} />
          </motion.div>
          <div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-genx-dark tracking-tight mb-2">
              The Core Motive
            </h2>
          </div>
        </div>
        
        <p className="relative z-10 text-gray-600 font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-3xl">
          The GenXCode Developers Fund was established with an unyielding purpose: to bridge the financial gap for passionate B.Tech students who possess raw architectural talent. We ensure that the lack of financial runway never prevents a builder from hosting a project, scaling a database, or traveling to a national hackathon.
        </p>
      </motion.div>

      {/* Module 2: Modern Resources (Dark Tech Console) */}
      <motion.div 
        variants={perspectiveVariant}
        className="lg:col-span-4 bg-genx-dark rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(34,7,73,0.2)] flex flex-col justify-center relative overflow-hidden group transform-gpu will-change-transform hover:-translate-y-1 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,166,243,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-genx-accent/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
        
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Layers size={28} className="text-genx-accent mb-5" strokeWidth={1.5} />
        </motion.div>
        
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 tracking-tight">
          Modern Resources
        </h3>
        <p className="text-gray-300 font-body text-sm font-medium leading-relaxed">
          Whether crafting fluid animations with Framer Motion or structuring architectures using React & TypeScript, this fund ensures server costs and API keys never halt innovation.
        </p>
      </motion.div>

      {/* Module 3: Developer Velocity (Glass Metric Card) */}
      <motion.div 
        variants={perspectiveVariant}
        className="lg:col-span-4 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(34,7,73,0.03)] flex flex-col items-center justify-center text-center relative overflow-hidden group transform-gpu will-change-transform hover:-translate-y-1 transition-all duration-500"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-400/5 rounded-full blur-2xl transition-colors duration-700 group-hover:bg-emerald-400/10"></div>
        
        <div className="relative mb-5">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-emerald-500/30 rounded-full"
          />
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner relative z-10">
            <Activity size={28} strokeWidth={1.5} />
          </div>
        </div>
        
        <h3 className="text-2xl lg:text-3xl font-heading font-bold text-genx-dark mb-2">
          Zero Friction
        </h3>
        <p className="text-gray-500 font-body text-xs lg:text-sm font-bold uppercase tracking-widest">
          Direct Developer Impact
        </p>
      </motion.div>
      
    </motion.div>
  );
}