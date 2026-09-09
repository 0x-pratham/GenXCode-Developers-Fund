'use client';
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { submitDonation } from '@/app/dashboard/actions';
import { UploadCloud, CheckCircle2, Clock, XCircle, FileImage, MessageSquareQuote, AlertCircle, QrCode, Timer, Copy } from 'lucide-react';

const QR_TARGETS = [
  { name: 'Rohit', upi: '9881842449@ybl', image: '/RohitQR.jpeg' },
  { name: 'Samruddhi', upi: 'samukadam2409@okaxis', image: '/SamruddhiQR.jpeg' }
];

const SESSION_DURATION = 300; // 5 minutes in seconds

export default function DonationsTab({ donations }: { donations: any[] }) {
  const [activeQR, setActiveQR] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const [copied, setCopied] = useState(false);

  // 5-Minute Session Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch QR code and reset timer
          setActiveQR((current) => (current === 0 ? 1 : 0));
          return SESSION_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTarget = QR_TARGETS[activeQR];
  const progressPercentage = (timeLeft / SESSION_DURATION) * 100;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        
        {/* Left Column: Dynamic QR Session (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-genx-dark tracking-tight">Active Payment Gateway</h2>
            <p className="text-gray-500 font-medium mt-2">Scan the secure QR code below. This payment session automatically rotates every 5 minutes.</p>
          </div>

          {/* Luxurious Active Session Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(34,7,73,0.06)] flex flex-col items-center relative overflow-hidden group">
            
            {/* Session Timer Header */}
            <div className="w-full flex justify-between items-center mb-6 px-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Live Session
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 font-mono">
                <Timer size={14} className="text-gray-400" />
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Dynamic QR Display with smooth fade transition */}
            <div className="w-full max-w-[260px] aspect-square relative rounded-3xl overflow-hidden mb-6 border border-gray-100 bg-white flex items-center justify-center p-3 shadow-sm transition-opacity duration-500">
              <Image 
                key={currentTarget.name} // Forces a re-render/animation on swap
                src={currentTarget.image} 
                alt={`${currentTarget.name} UPI QR Code`}
                fill
                priority // FIX: Added to prevent LCP warnings
                className="object-contain p-2 animate-in fade-in zoom-in duration-500"
              />
            </div>

            {/* Target Details & Copy Action */}
            <div className="w-full text-center mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                <QrCode size={14} /> {currentTarget.name}'s UPI ID
              </span>
              <button 
                onClick={() => copyToClipboard(currentTarget.upi)}
                className="group/btn relative w-full flex items-center justify-center gap-2 font-bold text-genx-dark text-sm bg-gray-50 hover:bg-genx-primary/5 border border-gray-200 hover:border-genx-primary/30 px-4 py-3 rounded-2xl transition-all active:scale-[0.98]"
              >
                {currentTarget.upi}
                <Copy size={14} className={`${copied ? 'text-emerald-500' : 'text-gray-400 group-hover/btn:text-genx-primary'} transition-colors`} />
                {copied && <span className="absolute -top-8 bg-emerald-500 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-md animate-in fade-in slide-in-from-bottom-1">Copied!</span>}
              </button>
            </div>

            {/* Progress Bar for the Timer */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-genx-primary transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Engineered Warning Pill */}
          <div className="bg-red-50/90 backdrop-blur-md border border-red-100 p-5 rounded-[1.5rem] flex items-start gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={22} />
            <p className="text-sm text-red-700 leading-relaxed">
              <span className="font-bold block mb-0.5">Final Contribution Policy</span>
              Once a payment is successfully processed, it is registered as a verified donation and <span className="font-bold underline decoration-red-300 underline-offset-2">cannot be replaced, modified, or refunded.</span>
            </p>
          </div>
        </div>

        {/* Right Column: Upload Form (7 columns) */}
        <div className="lg:col-span-7 p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(34,7,73,0.06)] flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-genx-primary/10 flex items-center justify-center text-genx-primary shadow-inner">
              <UploadCloud size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-genx-dark tracking-tight">Submit Payment Proof</h2>
              <p className="text-sm font-medium text-gray-500">Upload your screenshot to claim your legacy tier.</p>
            </div>
          </div>

          <form action={submitDonation} className="flex flex-col gap-6 flex-grow">
            <div>
              <label className="block text-gray-600 font-bold text-xs uppercase tracking-wider mb-2 ml-1">
                Amount Donated (₹)
              </label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg group-focus-within:text-genx-primary transition-colors">₹</span>
                <input 
                  name="amount" 
                  type="number" 
                  min="1"
                  required 
                  className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50/50 border border-gray-200 text-genx-dark font-bold text-lg placeholder:text-gray-300 placeholder:font-normal focus:outline-none focus:bg-white focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                  placeholder="500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-600 font-bold text-xs uppercase tracking-wider mb-2 ml-1 flex justify-between items-end">
                <span>Message to the Builders</span>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">OPTIONAL</span>
              </label>
              <div className="relative group">
                <MessageSquareQuote className="absolute left-4 top-4 text-gray-400 group-focus-within:text-genx-primary transition-colors" size={18} />
                <textarea 
                  name="message" 
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50/50 border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm resize-none"
                  placeholder="Leave an encouraging note for the hackathon students..."
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-bold text-xs uppercase tracking-wider mb-2 ml-1">
                Transaction Screenshot
              </label>
              <div className="relative">
                <input 
                  name="screenshot" 
                  type="file" 
                  accept="image/*"
                  required 
                  className="w-full p-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-500 font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:uppercase file:tracking-wider file:font-bold file:bg-genx-primary text-white hover:file:bg-genx-dark file:transition-all file:cursor-pointer cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button type="submit" className="w-full px-6 py-4 bg-genx-dark text-white hover:bg-genx-primary transition-all duration-500 rounded-xl font-bold shadow-[0_10px_30px_rgba(34,7,73,0.15)] hover:shadow-[0_15px_40px_rgba(94,35,150,0.25)] active:scale-[0.98] flex justify-center items-center gap-2">
                Verify Contribution <CheckCircle2 size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- Upgraded Contribution History UI --- */}
      <h2 className="text-3xl font-heading font-bold text-genx-dark mb-6 tracking-tight flex items-center gap-3">
        Contribution Ledger
        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">{donations?.length || 0} Records</span>
      </h2>
      
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Date</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Proof</th>
                <th className="p-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations?.map((donation) => (
                <Fragment key={donation.id}>
                  <tr className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-6 py-5 text-gray-500 font-medium whitespace-nowrap text-sm">
                      {/* FIX: Hardcoded 'en-US' locale to prevent SSR/Client hydration mismatch */}
                      {new Date(donation.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 font-bold text-genx-dark text-lg whitespace-nowrap">
                      ₹{donation.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <a href={donation.screenshot_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-genx-primary hover:text-genx-dark transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-genx-primary/30 uppercase tracking-wider active:scale-95 shadow-sm">
                        <FileImage size={14} />
                        View Receipt
                      </a>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                        donation.status === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                        donation.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-500' : 
                        'bg-amber-50 border-amber-100 text-amber-600'
                      }`}>
                        {donation.status === 'approved' && <CheckCircle2 size={14} />}
                        {donation.status === 'pending' && <Clock size={14} />}
                        {donation.status === 'rejected' && <XCircle size={14} />}
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                  {/* Integrated Message Row (Seamless look) */}
                  {donation.message && (
                    <tr className="bg-gray-50/30 group-hover:bg-gray-50/60 transition-colors border-t-0">
                      <td colSpan={4} className="px-6 py-4 border-l-4 border-transparent group-hover:border-genx-primary/20 transition-colors pl-8">
                        <div className="flex gap-3 text-gray-500 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <MessageSquareQuote size={16} className="text-genx-primary/40 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium italic leading-relaxed">
                            "{donation.message}"
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
              
              {/* Empty State */}
              {(!donations || donations.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-24 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 border border-gray-100 text-gray-300 mb-5 shadow-sm">
                      <FileImage size={28} />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-genx-dark mb-2">No Records Found</h3>
                    <p className="text-gray-500 font-medium text-sm">Your legacy begins with your first contribution.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}