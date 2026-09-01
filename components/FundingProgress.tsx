'use client';
import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform, Variants } from 'framer-motion';
import { Server, Users, Code2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface FundingProgressProps {
  currentAmount: number;
  targetAmount: number;
}

export default function FundingProgress({ currentAmount, targetAmount }: FundingProgressProps) {
  const [liveAmount, setLiveAmount] = useState(currentAmount);
  const percentage = Math.min((liveAmount / targetAmount) * 100, 100);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchInitialTotal = async () => {
      const { data } = await supabase
        .from('donations')
        .select('amount')
        .eq('status', 'approved');
        
      const initialTotal = data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
      setLiveAmount(initialTotal);
    };

    fetchInitialTotal();
    
    const channel = supabase
      .channel('realtime-donations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations' },
        async () => {
          const { data } = await supabase
            .from('donations')
            .select('amount')
            .eq('status', 'approved');
            
          const updatedTotal = data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
          setLiveAmount(updatedTotal);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const count = useMotionValue(0);
  const roundedText = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, liveAmount, { 
      duration: 2, 
      ease: [0.16, 1, 0.3, 1] as const 
    });
    return controls.stop;
  }, [liveAmount, count]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-24 px-6 relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-heading font-bold text-genx-dark tracking-tight leading-[1.1] mb-6">
            AY 2026-27 <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-genx-dark via-genx-primary to-slate-400">
              Innovation Fund
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-500 font-body text-lg font-medium leading-relaxed mb-8">
            Securing the resources required to scale our operations for the upcoming academic cycle. This fund directly powers student hackathon grants, sustains our high-performance cloud architecture, and fuels open-source community initiatives.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-4 bg-white/40 p-3 rounded-xl border border-gray-100 transition-all cursor-default hover:shadow-md hover:bg-white/80"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users size={18} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-genx-dark">50+ Student Grants Target</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-4 bg-white/40 p-3 rounded-xl border border-gray-100 transition-all cursor-default hover:shadow-md hover:bg-white/80"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Server size={18} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-genx-dark">Vercel & Supabase Scaling</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 w-full bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-[0_20px_60px_rgba(34,7,73,0.05),inset_0_1px_0_rgba(255,255,255,0.6)] p-10 md:p-14 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-genx-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-genx-primary/15 transition-colors duration-700 transform-gpu"></div>
          
          <div className="flex flex-col gap-2 mb-10">
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-6xl md:text-7xl font-bold font-heading tracking-tight text-genx-dark flex">
                ₹<motion.span>{roundedText}</motion.span>
              </span>
              <span className="text-2xl font-bold text-gray-400 font-body">
                / ₹{targetAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: `${percentage}%`, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
              className="absolute -top-10 -translate-x-1/2 flex flex-col items-center z-10"
            >
              <div className="bg-genx-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
                {percentage.toFixed(1)}%
              </div>
              <div className="w-2 h-2 bg-genx-dark rotate-45 -mt-1.5"></div>
            </motion.div>

            <div className="h-6 w-full bg-gray-100/80 rounded-full overflow-hidden border border-gray-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-genx-primary via-genx-accent to-slate-300 relative shadow-[0_0_20px_rgba(199,166,243,0.6)] rounded-full"
              >
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                />
              </motion.div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Code2 size={16} />
              <span>Real-time tracking active</span>
            </div>
            
            {percentage >= 100 && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs tracking-widest uppercase rounded-full shadow-sm"
              >
                Goal Reached 🎉
              </motion.span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}