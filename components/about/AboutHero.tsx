'use client';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32 relative -mt-12 lg:-mt-24">
      <motion.div 
        style={{ y: textY }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left z-20 transform-gpu will-change-transform"
      >
        <motion.h1 variants={fadeUpVariant} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-heading font-bold tracking-tight mb-8 leading-[1.05]">
          <span className="block text-genx-dark mb-1">Fueling the</span>
          <span className="block text-genx-dark mb-1">Next Generation</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-genx-primary via-genx-accent to-slate-400 pb-2">
            of Builders.
          </span>
        </motion.h1>

        <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-gray-500 font-body leading-relaxed max-w-lg font-medium mb-10">
          We believe that financial constraints should never be the barrier between a brilliant idea and a launched, production-ready product.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="w-full sm:w-auto">
          <Link 
            href="/login" 
            className="group flex w-full sm:inline-flex items-center justify-center gap-3 px-8 py-4 bg-genx-dark text-white rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-genx-primary hover:shadow-[0_12px_30px_rgba(94,35,150,0.25)] active:scale-95 border border-transparent hover:border-genx-accent/30"
          >
            Join the Movement
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        viewport={{ once: false, amount: 0.2 }}
        className="lg:col-span-6 relative w-full flex justify-center transform-gpu will-change-transform"
      >
        <div className="relative z-10 w-full max-w-md lg:max-w-full">
          <Image 
            src="/abouthero.png" 
            alt="GenXCode Builders"
            width={800}
            height={800}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-genx-primary/10 rounded-full blur-[70px] z-0 pointer-events-none"></div>
      </motion.div>
    </div>
  );
}