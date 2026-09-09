'use client';
import { motion, Variants } from 'framer-motion';
import { User, Globe, Trophy, Medal, Award, ArrowUpRight } from 'lucide-react';

interface Donor {
  donor_name: string;
  total_amount: number;
  avatar_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  bio: string | null;
}

const getTier = (amount: number) => {
  if (amount >= 10000) return { name: 'Diamond Patron', color: 'text-blue-700 bg-blue-50 border-blue-200' };
  if (amount >= 2500) return { name: 'Silver Patron', color: 'text-slate-700 bg-slate-50 border-slate-300' };
  return { name: 'Bronze Patron', color: 'text-amber-700 bg-amber-50 border-amber-200' };
};

export default function HallOfFameClient({ donors }: { donors: Donor[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } }
  };

  if (donors.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-16 bg-white/70 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(34,7,73,0.06)] rounded-[2rem]">
        <h2 className="text-3xl font-heading font-bold text-genx-dark mb-3 tracking-tight">
          The Hall is currently empty.
        </h2>
        <p className="text-gray-500 font-medium font-body text-lg">
          Be the first to claim the #1 spot and etch your name into GenXCode history!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
      {donors.map((donor, index) => {
        const globalRank = index + 1;
        const tier = getTier(donor.total_amount);
        
        // Dynamically style the top 3 ranks within the list
        let rankStyling = "bg-gray-50 text-gray-400 border-gray-100";
        let cardStyling = "bg-white/80 border-white hover:border-gray-200";
        let RankIcon = null;

        if (globalRank === 1) {
          rankStyling = "bg-amber-100 text-amber-700 border-amber-200 ring-2 ring-amber-100";
          cardStyling = "bg-gradient-to-r from-amber-50/50 to-white border-amber-100/50 shadow-[0_0_30px_rgba(252,211,77,0.15)] hover:border-amber-200";
          RankIcon = Trophy;
        } else if (globalRank === 2) {
          rankStyling = "bg-slate-100 text-slate-600 border-slate-200";
          cardStyling = "bg-gradient-to-r from-slate-50/50 to-white border-slate-100 shadow-[0_0_20px_rgba(203,213,225,0.2)] hover:border-slate-200";
          RankIcon = Medal;
        } else if (globalRank === 3) {
          rankStyling = "bg-orange-50 text-orange-600 border-orange-200";
          cardStyling = "bg-gradient-to-r from-orange-50/30 to-white border-orange-100 shadow-[0_0_20px_rgba(253,186,116,0.15)] hover:border-orange-200";
          RankIcon = Award;
        }

        return (
          <motion.div 
            key={globalRank} 
            variants={itemVariants} 
            layout // Allows smooth list reordering if data changes
            className={`backdrop-blur-md border rounded-[1.5rem] p-5 sm:p-6 shadow-[0_4px_20px_rgba(34,7,73,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:shadow-[0_8px_30px_rgba(34,7,73,0.06)] transition-all duration-300 ${cardStyling}`}
          >
            
            {/* Left Section: Rank, Avatar, Name & Bio */}
            <div className="flex items-start sm:items-center gap-5 w-full sm:w-auto">
              
              {/* Rank Badge */}
              <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center font-bold border shrink-0 relative ${rankStyling}`}>
                {RankIcon && <RankIcon size={12} className="absolute -top-1 -right-1 bg-white rounded-full p-[2px] shadow-sm" />}
                #{globalRank}
              </div>
              
              {/* Avatar */}
              <div className="w-14 h-14 bg-gray-100 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                {donor.avatar_url ? (
                  <img src={donor.avatar_url} alt={donor.donor_name} className="w-full h-full object-cover" />
                ) : (
                  <User size={24} className="text-gray-300" />
                )}
              </div>

              {/* Details (Name, Tier, Links, Bio) */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg sm:text-xl font-bold text-genx-dark tracking-tight group-hover:text-genx-primary transition-colors">
                    {donor.donor_name}
                  </h3>
                  
                  {/* Social Links visible right next to name */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                    {donor.github_url && <a href={donor.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-genx-dark p-1 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg></a>}
                    {donor.portfolio_url && <a href={donor.portfolio_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-genx-primary p-1 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"><Globe size={14} /></a>}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${tier.color}`}>
                    {tier.name}
                  </span>
                  {donor.bio && (
                    <span className="text-xs text-gray-500 font-medium italic line-clamp-1 max-w-xs border-l border-gray-200 pl-3">
                      "{donor.bio}"
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section: Impact Score */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100/50">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Impact</p>
                <p className={`text-xl sm:text-2xl font-bold flex items-center gap-1.5 ${globalRank <= 3 ? 'text-genx-primary' : 'text-genx-dark'}`}>
                  ₹{donor.total_amount.toLocaleString()}
                  <ArrowUpRight size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </p>
              </div>
            </div>
            
          </motion.div>
        );
      })}
    </motion.div>
  );
}