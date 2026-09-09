'use client';
import { useState } from 'react';
import { User, FileText, Globe, Award, Camera } from 'lucide-react';
import { updateProfile } from '@/app/dashboard/actions';

interface ProfileTabProps {
  profile: any;
  totalImpact: number;
  tier: { name: string; color: string };
}

export default function ProfileTab({ profile, totalImpact, tier }: ProfileTabProps) {
  // Local state for instant avatar preview
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Gamification Logic
  let nextTierGoal = 0;
  let nextTierName = '';
  
  if (totalImpact < 2500) {
    nextTierGoal = 2500;
    nextTierName = 'Silver Patron';
  } else if (totalImpact < 10000) {
    nextTierGoal = 10000;
    nextTierName = 'Diamond Patron';
  }

  const progressPercentage = nextTierGoal ? Math.min((totalImpact / nextTierGoal) * 100, 100) : 100;
  const amountRemaining = nextTierGoal ? nextTierGoal - totalImpact : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
      
      {/* Left: Dynamic Legacy Badge & Progression */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(34,7,73,0.06)] flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Interactive Avatar Upload */}
          <div className="relative group w-28 h-28 mb-6">
            <div className="w-full h-full bg-gray-100 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-xl">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-gray-300" />
              )}
            </div>
            
            {/* Overlay that acts as a label for the hidden file input */}
            <label className="absolute inset-0 bg-genx-dark/60 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-300 backdrop-blur-sm border-4 border-transparent">
              <Camera size={24} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
              <input 
                type="file" 
                name="avatar_file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden" 
                form="profile-form" // Links input to the main form below
              />
            </label>
          </div>

          <h2 className="text-2xl font-bold font-heading text-genx-dark mb-1">{profile?.name || 'Anonymous Developer'}</h2>
          <p className="text-gray-500 font-medium mb-6 text-sm">Lifetime Impact: ₹{totalImpact.toLocaleString()}</p>
          
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-sm font-bold tracking-wide uppercase ${tier.color}`}>
            <Award size={16} /> {tier.name}
          </div>

          {/* Next-Tier Progression Bar */}
          {nextTierGoal > 0 ? (
            <div className="w-full mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                <span>Current</span>
                <span>{nextTierName}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-genx-primary to-genx-accent rounded-full relative transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Donate <span className="font-bold text-genx-dark">₹{amountRemaining.toLocaleString()}</span> more to unlock {nextTierName} status.
              </p>
            </div>
          ) : (
            <div className="w-full mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-2 rounded-lg border border-blue-100">
                Maximum Tier Reached
              </p>
              <p className="text-xs text-gray-500 font-medium mt-3">You are in the highest echelon of supporters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Editable Settings Form */}
      <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_60px_rgba(34,7,73,0.06)] p-8 md:p-10">
        <form id="profile-form" action={updateProfile} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold text-xs uppercase tracking-wider mb-2 ml-1">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  name="name" 
                  defaultValue={profile?.name || ''}
                  required 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold text-xs uppercase tracking-wider mb-2 ml-1">GitHub URL</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <input 
                  name="github_url" 
                  type="url"
                  defaultValue={profile?.github_url || ''}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-xs uppercase tracking-wider mb-2 ml-1">Personal Portfolio / Website</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                name="portfolio_url" 
                type="url"
                defaultValue={profile?.portfolio_url || ''}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-xs uppercase tracking-wider mb-2 ml-1">Short Bio</label>
            <div className="relative">
              <FileText className="absolute left-4 top-6 text-gray-400" size={18} />
              <textarea 
                name="bio" 
                rows={4}
                defaultValue={profile?.bio || ''}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm resize-none"
                placeholder="Tell us a bit about your tech stack and what you build..."
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="px-10 py-4 bg-genx-primary text-white hover:bg-genx-dark transition-all duration-300 rounded-full font-bold shadow-[0_8px_20px_rgba(94,35,150,0.2)] active:scale-95">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}