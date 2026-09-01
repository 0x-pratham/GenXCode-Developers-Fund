'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Diamond } from 'lucide-react';

interface DonorRowProps {
  index: number;
  name: string;
  amount: number;
}

// Gamification Logic: Refined for Luxury Light Theme (Jewel & Metallic Tones)
const getBadgeInfo = (amount: number) => {
  if (amount >= 5000) {
    return { 
      label: 'Diamond Tier', 
      color: 'text-sky-600', 
      cardBg: 'bg-white/80', 
      badgeBg: 'bg-sky-50', 
      border: 'border-sky-100', 
      shadow: 'hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)]', 
      Icon: Diamond 
    };
  }
  if (amount >= 1000) {
    return { 
      label: 'Gold Tier', 
      color: 'text-amber-500', 
      cardBg: 'bg-white/80', 
      badgeBg: 'bg-amber-50', 
      border: 'border-amber-100', 
      shadow: 'hover:shadow-[0_12px_30px_rgba(245,158,11,0.12)]', 
      Icon: Trophy 
    };
  }
  if (amount >= 500) {
    return { 
      label: 'Bronze Tier', 
      color: 'text-orange-500', 
      cardBg: 'bg-white/80', 
      badgeBg: 'bg-orange-50', 
      border: 'border-orange-100', 
      shadow: 'hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]', 
      Icon: Medal 
    };
  }
  return { 
    label: 'Supporter', 
    color: 'text-genx-primary', 
    cardBg: 'bg-white/80', 
    badgeBg: 'bg-genx-primary/5', 
    border: 'border-genx-primary/15', 
    shadow: 'hover:shadow-[0_12px_30px_rgba(94,35,150,0.08)]', 
    Icon: Star 
  };
};

export default function HallOfFameRow({ index, name, amount }: DonorRowProps) {
  const badge = getBadgeInfo(amount);
  const { Icon } = badge;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-[1.5rem] backdrop-blur-xl border transition-all duration-300 cursor-default ${badge.cardBg} ${badge.border} ${badge.shadow}`}
    >
      <div className="flex items-center gap-6 mb-4 sm:mb-0">
        <span className={`text-4xl font-heading font-bold opacity-70 ${badge.color}`}>
          #{index + 1}
        </span>
        <div>
          <h3 className="text-2xl font-bold font-heading text-genx-dark tracking-tight">
            {name}
          </h3>
          <div className={`flex items-center gap-1.5 text-xs font-bold mt-1.5 px-3 py-1 rounded-full w-fit border ${badge.border} ${badge.badgeBg} ${badge.color} tracking-wide uppercase`}>
            <Icon size={14} strokeWidth={2.5} />
            {badge.label}
          </div>
        </div>
      </div>
      
      {/* Sleek Pill-Shaped Total Container */}
      <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm">
        <span className="text-gray-400 text-xs font-body uppercase tracking-widest font-semibold">
          Total
        </span>
        <span className={`text-2xl font-bold font-body ${badge.color}`}>
          ₹{amount.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}