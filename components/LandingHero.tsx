'use client';
import { motion, Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import MoneyBag3D from '@/components/MoneyBag3D';

export default function LandingHero() {
  // Engineered Animation Protocol: Staggered Blur Reveal with explicit Variants typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      // Custom spring-like cubic bezier easing for a highly mechanical, premium feel
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-2 pb-20 lg:pt-4 lg:pb-0 mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 min-h-[70vh]">
      
      {/* Engineered Background Glow (Mobile & Desktop) */}
      <div className="absolute top-1/4 right-0 lg:right-1/4 w-[500px] h-[500px] bg-genx-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Left Column: 3D Visual Asset with Smooth Bottom Dissolve */}
      <div className="hidden lg:flex w-full h-[600px] items-center justify-center relative [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]">
        <MoneyBag3D />
      </div>

      {/* Right Column: Hero Content (Centered on Mobile, Right-Aligned on Desktop) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col items-center text-center lg:items-end lg:text-right w-full"
      >
        {/* Engineered Heading with Metallic Gradient */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-[5rem] font-heading font-bold mb-6 tracking-tight leading-[1.05]"
        >
          <span className="block text-genx-dark mb-1 lg:mb-0">GenXCode</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-genx-dark via-genx-primary to-slate-400 pb-2">
            Developers Fund
          </span>
        </motion.h1>
        
        {/* Constrained Body Text */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-500 mb-10 font-body leading-relaxed max-w-xl lg:max-w-md font-medium"
        >
          A movement to empower the next generation. Your donations directly fund students who want to participate in Hackathons but lack the financial resources.
        </motion.p>

        {/* Tactile Actions (Centered on Mobile, Aligned Right on Desktop) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end items-center w-full sm:w-auto"
        >
          <Button href="/hall-of-fame" variant="light" className="w-full sm:w-auto px-8 py-4 lg:py-3.5">
            View Hall of Fame
          </Button>
          <Button href="/login" variant="dark" className="w-full sm:w-auto px-10 py-4 lg:py-3.5 text-base">
            Donate Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}