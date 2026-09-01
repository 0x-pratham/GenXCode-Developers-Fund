'use client';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Award, Cpu, Globe2, ShieldCheck } from 'lucide-react';

export default function DonationBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Engineered Animation Protocols with explicit Variants typing
  const headerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto mb-4 px-6 relative z-10">
      
      {/* Background Energy Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20 opacity-30 mask-image:linear-gradient(to_bottom,transparent,black,transparent)">
        <div className="absolute top-[10%] left-[20%] w-[1px] h-[80%] bg-gradient-to-b from-transparent via-genx-primary to-transparent"></div>
        <div className="absolute top-[30%] right-[30%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-genx-accent to-transparent"></div>
      </div>

      <motion.div 
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="text-center mb-20 max-w-3xl mx-auto relative"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe2 size={16} className="text-genx-primary" />
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-genx-primary">
            Empowering India's Tech Talent
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-genx-dark tracking-tight leading-[1.05] mb-6">
          Unleash the Potential of <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-genx-primary via-genx-accent to-genx-dark">
            Indian Engineering.
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative">
        
        {/* Left Column: Sticky, Floating 3D Character */}
        <div className="lg:sticky lg:top-32 flex justify-center lg:justify-start lg:h-[calc(100vh-200px)] items-center relative z-20">
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotateZ: [0, 2, -1, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full max-w-md md:max-w-lg"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-genx-accent/20 rounded-full blur-[80px] -z-10 animate-pulse transform-gpu translate-z-0 will-change-transform"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-genx-primary/10 rounded-full blur-[60px] -z-10 transform-gpu translate-z-0 will-change-transform"></div>
            
            <Image 
              src="/Benefitts.png" 
              alt="Excited Developer" 
              width={800} 
              height={800} 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(34,7,73,0.2)]"
              priority
            />
          </motion.div>
        </div>

        {/* Right Column: Cascading Interactive Panels */}
        <div className="flex flex-col gap-8 md:gap-12 relative z-30 pt-10 pb-10">
          
          <motion.div 
            style={{ y: y1 }}
            whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5, zIndex: 40 }}
            className="w-full lg:ml-12 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(34,7,73,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 relative overflow-hidden group cursor-default transform-gpu will-change-transform"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-genx-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 transform-gpu translate-z-0"></div>
            <div className="w-16 h-16 bg-genx-soft text-genx-primary rounded-2xl flex items-center justify-center mb-6 border border-genx-primary/10 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
              <Cpu size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold font-heading text-genx-dark mb-4">Architecting at Scale</h3>
            <p className="text-gray-600 font-body text-lg font-medium leading-relaxed">
              Equip students to deploy high-performance cloud architectures, secure production API keys, and launch products without the crushing weight of server costs.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            whileHover={{ scale: 1.03, rotateX: -5, rotateY: 5, zIndex: 40 }}
            className="w-full lg:-ml-12 bg-genx-dark border border-genx-dark/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(34,7,73,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden group cursor-default transform-gpu will-change-transform"
          >
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-genx-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 transform-gpu translate-z-0"></div>
            <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner backdrop-blur-md group-hover:-translate-y-2 transition-transform duration-500">
              <Award size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold font-heading text-white mb-4">Earn Your Legacy</h3>
            <p className="text-gray-300 font-body text-lg font-medium leading-relaxed">
              Ascend the ranks in our public Hall of Fame. Your contribution is permanently recognized, unlocking exclusive discord roles and showcasing your commitment to the next generation.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y3 }}
            whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5, zIndex: 40 }}
            className="w-full lg:ml-6 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(34,7,73,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 relative overflow-hidden group cursor-default transform-gpu will-change-transform"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-genx-primary/5 rounded-full blur-3xl group-hover:bg-genx-primary/10 transition-colors duration-700 transform-gpu translate-z-0"></div>
            <div className="w-16 h-16 bg-genx-soft text-genx-primary rounded-2xl flex items-center justify-center mb-6 border border-genx-primary/10 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold font-heading text-genx-dark mb-4">100% Direct Impact</h3>
            <p className="text-gray-600 font-body text-lg font-medium leading-relaxed">
              Zero administrative friction. Every rupee is mathematically tracked via our transparent dashboard and instantly deployed to the students who need it to ship code.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}