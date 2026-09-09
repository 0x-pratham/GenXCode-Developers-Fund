'use client';
import { useState } from 'react';
import { Maximize2, Check, X, ShieldAlert, Info, Edit3, Save, Trash2, Ban } from 'lucide-react';
import { updateDonationStatus, updateDonationMessage, banUser } from './actions';

export default function AdminCardClient({ donation }: { donation: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [editedMessage, setEditedMessage] = useState(donation.message || '');
  const [isBanning, setIsBanning] = useState(false);

  const handleSaveMessage = async () => {
    await updateDonationMessage(donation.id, editedMessage.trim() || null);
    setIsEditingMessage(false);
  };

  const handleBan = async () => {
    if (confirm("WARNING: This will permanently ban this user and reject this donation. Proceed?")) {
      setIsBanning(true);
      await banUser(donation.user_id, donation.id);
    }
  };

  return (
    <div className="relative w-full h-[580px] perspective-1000 group">
      <div className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT OF CARD (Standard Review) */}
        <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_12px_35px_rgba(34,7,73,0.06)] overflow-hidden flex flex-col hover:shadow-[0_20px_50px_rgba(34,7,73,0.1)] transition-shadow">
          
          {/* Header Action Bar */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
              onClick={() => setIsFlipped(true)}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-genx-dark shadow-sm hover:scale-105 hover:bg-white transition-all"
              title="Inspect Metadata"
            >
              <Info size={18} />
            </button>
          </div>

          <div className="h-48 bg-gray-50 relative overflow-hidden border-b border-gray-100 shrink-0">
            <img 
              src={donation.screenshot_url} 
              alt="Payment Proof" 
              className="w-full h-full object-cover"
            />
            <a 
              href={donation.screenshot_url} 
              target="_blank" 
              rel="noreferrer"
              className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 text-genx-dark font-bold gap-2"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Maximize2 size={20} />
              </div>
            </a>
          </div>
          
          <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-gray-50/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-genx-dark tracking-tight mb-1 truncate max-w-[180px]">
                  {donation.profiles?.name || 'Unknown User'}
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {new Date(donation.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                <span className="text-xl font-body font-bold text-emerald-600 tracking-tight">₹{donation.amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Inline Message Moderation */}
            <div className="mb-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Donor Message</span>
                {!isEditingMessage && (
                  <button onClick={() => setIsEditingMessage(true)} className="text-gray-400 hover:text-genx-primary transition-colors">
                    <Edit3 size={14} />
                  </button>
                )}
              </div>
              
              {isEditingMessage ? (
                <div className="flex flex-col gap-2">
                  <textarea 
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-genx-primary/30 focus:ring-2 focus:ring-genx-primary/20 outline-none resize-none h-20 bg-genx-primary/5"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditedMessage('')} className="p-2 text-red-400 hover:text-red-600 bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    <button onClick={handleSaveMessage} className="px-3 py-1.5 bg-genx-dark text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-genx-primary transition-colors"><Save size={14}/> Save</button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-xl border border-gray-100 line-clamp-3 min-h-[3rem]">
                  {donation.message ? `"${donation.message}"` : <span className="text-gray-400 not-italic">No message provided.</span>}
                </div>
              )}
            </div>

            {/* Core Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
              <form action={updateDonationStatus.bind(null, donation.id, 'approved')} className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 py-3 rounded-xl font-bold shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95">
                  <Check size={16} strokeWidth={2.5} />
                  Approve
                </button>
              </form>
              <form action={updateDonationStatus.bind(null, donation.id, 'rejected')} className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-300 py-2.5 rounded-xl font-bold shadow-sm active:scale-95">
                  <X size={16} strokeWidth={2.5} />
                  Reject
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (Deep Inspection) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 border border-slate-700 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col text-slate-300">
          
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
            <h3 className="font-mono text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert size={16} className="text-blue-400"/> Security Inspection
            </h3>
            <button onClick={() => setIsFlipped(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-4 font-mono text-xs overflow-y-auto">
            <div>
              <span className="text-slate-500 block mb-1 uppercase tracking-widest">Transaction ID</span>
              <span className="text-slate-200 break-all">{donation.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1 uppercase tracking-widest">User ID</span>
              <span className="text-slate-200 break-all">{donation.user_id}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1 uppercase tracking-widest">Declared Amount</span>
              <span className="text-emerald-400 font-bold text-sm">₹{donation.amount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1 uppercase tracking-widest">Proof Asset Path</span>
              <a href={donation.screenshot_url} target="_blank" className="text-blue-400 hover:text-blue-300 break-all underline decoration-blue-800 underline-offset-4">
                {donation.screenshot_url.split('/').pop() || 'View Asset'}
              </a>
            </div>
            <div className="mt-auto pt-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                  <Ban size={14}/> Danger Zone
                </h4>
                <p className="text-red-300/70 mb-4 leading-relaxed">
                  If this transaction is fraudulent, ban the user to permanently revoke their access and reject all pending submissions.
                </p>
                <button 
                  onClick={handleBan}
                  disabled={isBanning}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors active:scale-95 disabled:opacity-50"
                >
                  {isBanning ? 'Executing Ban...' : 'Ban User & Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}