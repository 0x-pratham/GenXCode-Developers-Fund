'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Clock, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Mock data for the team members
const TEAM_MEMBERS = [
  { name: "Prathamesh Bhil", role: "GenXCode Lead", qr: "/qrs/member1-bank.jpg", upi: "prathamesh@upi" },
  { name: "Rahul S.", role: "Core Developer", qr: "/qrs/member2-bank.jpg", upi: "rahul@upi" },
  { name: "Aditi M.", role: "Community Manager", qr: "/qrs/member3-bank.jpg", upi: "aditi@upi" }
];

export default function PaymentQR() {
  const [activeMember, setActiveMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes secure session
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Randomly assign one of the team members on mount
    const randomIndex = Math.floor(Math.random() * TEAM_MEMBERS.length);
    setActiveMember(TEAM_MEMBERS[randomIndex]);

    // Secure session countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyUpi = () => {
    if (activeMember) {
      navigator.clipboard.writeText(activeMember.upi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!activeMember) {
    // Elegant skeleton loading state
    return <div className="animate-pulse bg-white/50 border border-gray-100 h-96 w-full rounded-[2rem]"></div>;
  }

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeRunningOut = timeLeft < 60;

  return (
    <div className="flex flex-col relative overflow-hidden rounded-[2rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(34,7,73,0.08)]">
      
      {/* Engineered Security Header */}
      <div className="bg-gray-50/80 p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-wide">
          <ShieldCheck size={18} strokeWidth={2.5} />
          <span>Secure P2P Transfer</span>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-mono px-3 py-1.5 rounded-full font-bold transition-colors ${isTimeRunningOut ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'}`}>
          <Clock size={14} className={isTimeRunningOut ? 'animate-pulse' : ''} />
          <span>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center relative">
        <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-2">Transferring via UPI to</h3>
        <div className="text-3xl font-heading text-genx-dark mb-8 font-bold flex flex-col items-center tracking-tight">
          {activeMember.name}
          <span className="text-sm text-genx-primary font-body font-semibold tracking-normal mt-1 bg-genx-primary/10 px-3 py-1 rounded-full">
            {activeMember.role}
          </span>
        </div>
        
        {/* Clean, Precise QR Code Container */}
        <div className="relative p-4 bg-white rounded-2xl shadow-[0_8px_30px_rgba(34,7,73,0.06)] border border-gray-100 mb-8">
          <div className="w-56 h-56 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden border border-gray-100/50">
            <img 
              src={activeMember.qr} 
              alt={`QR for ${activeMember.name}`} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            {!activeMember.qr && <span className="text-sm font-medium">Awaiting QR Data</span>}
          </div>
        </div>

        {/* Tactile UPI Copy Button */}
        <button 
          onClick={handleCopyUpi}
          className="flex items-center gap-4 bg-white border border-gray-200 hover:border-genx-primary/30 hover:bg-genx-soft px-6 py-4 rounded-xl transition-all duration-300 mb-8 group w-full justify-between shadow-sm hover:shadow-md"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">Or pay via UPI ID</span>
            <span className="font-mono text-genx-dark font-semibold group-hover:text-genx-primary transition-colors">
              {activeMember.upi}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
            {copied ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Copy className="text-gray-400 group-hover:text-genx-primary transition-colors" size={20} />}
          </div>
        </button>

        {/* Fintech-grade Trust Badges */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 font-medium">
            <Lock size={18} className="text-genx-primary" />
            <span>100% Direct-to-Fund Transfer</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 font-medium">
            <AlertCircle size={18} className="text-amber-500" />
            <span>Keep your screenshot for the upload step.</span>
          </div>
        </div>

      </div>
    </div>
  );
}