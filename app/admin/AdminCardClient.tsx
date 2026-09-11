'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, Check, X, ShieldAlert, Edit3, Save, Trash2, 
  Terminal, UserX, Database, CheckCircle, AlertOctagon, 
  ExternalLink, User, Code
} from 'lucide-react';
import { updateDonationStatus, updateDonationMessage, banUser } from './actions';

export default function AdminCardClient({ donation }: { donation: any }) {
  const [showMetadata, setShowMetadata] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [editedMessage, setEditedMessage] = useState(donation.message || '');
  const [isBanning, setIsBanning] = useState(false);

  // Safe Data Unboxing from Supabase joins (handles both single objects and array returns)
  const profile = Array.isArray(donation.profiles) ? donation.profiles[0] : donation.profiles;
  const isProfileLinked = Boolean(profile && profile.name);
  const donorName = profile?.name || 'Unlinked Profile';
  const avatarUrl = profile?.avatar_url || null;
  const githubUrl = profile?.github_url || null;

  const handleSaveMessage = async () => {
    await updateDonationMessage(donation.id, editedMessage.trim() || null);
    setIsEditingMessage(false);
  };

  const handleBan = async () => {
    if (confirm(`CRITICAL WARNING: Permanently ban ${donorName} (ID: ${donation.user_id}) and reject this payment?`)) {
      setIsBanning(true);
      await banUser(donation.user_id, donation.id);
    }
  };

  return (
    <div className="relative w-full h-[640px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col group">
      
      {/* Top Controls: Mode Switcher */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button 
          onClick={() => setShowMetadata(!showMetadata)}
          className={`h-9 px-3 rounded-lg flex items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm border ${
            showMetadata 
              ? 'bg-gray-900 text-emerald-400 border-gray-700' 
              : 'bg-white/90 backdrop-blur-md text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          title="Toggle Forensic DB Inspector"
        >
          {showMetadata ? (
            <>
              <X size={14} /> Close Inspector
            </>
          ) : (
            <>
              <Terminal size={14} /> Inspect DB Payload
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showMetadata ? (
          /* ================= FRONT: VISUAL VERIFICATION ================= */
          <motion.div 
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col h-full w-full"
          >
            {/* Proof Screenshot */}
            <div className="h-52 bg-gray-100 relative overflow-hidden shrink-0 border-b border-gray-200">
              <img 
                src={donation.screenshot_url} 
                alt="Payment Proof" 
                className="w-full h-full object-cover"
              />
              <a 
                href={donation.screenshot_url} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-900 hover:scale-110 transition-transform">
                  <Maximize2 size={20} />
                </div>
              </a>
            </div>
            
            {/* Verified Donor Details */}
            <div className="p-5 flex-1 flex flex-col bg-white">
              
              {/* User Identity Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  {/* User Avatar */}
                  <div className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={donorName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-gray-400" />
                    )}
                  </div>

                  {/* Name & DB Status */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-gray-900 truncate" title={donorName}>
                        {donorName}
                      </h3>
                      {/* FIX: Wrapped icons in span tags to resolve TypeScript title attribute errors */}
                      {isProfileLinked ? (
                        <span title="Verified profiles table record" className="flex items-center">
                          <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        </span>
                      ) : (
                        <span title="Orphan record: missing profile row" className="flex items-center">
                          <AlertOctagon size={14} className="text-amber-500 shrink-0" />
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-gray-400">
                        {new Date(donation.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {githubUrl && (
                        <a 
                          href={githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-0.5 text-[10px] text-gray-500 hover:text-gray-900 underline font-mono"
                        >
                          <Code size={11} /> GitHub <ExternalLink size={9} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount Tag */}
                <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 shrink-0 text-right">
                  <span className="text-lg font-bold text-emerald-600 tracking-tight">₹{donation.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Message Moderation Box */}
              <div className="mb-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Attached Message
                  </span>
                  {!isEditingMessage && (
                    <button 
                      onClick={() => setIsEditingMessage(true)} 
                      className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded"
                    >
                      <Edit3 size={11} /> Edit
                    </button>
                  )}
                </div>
                
                {isEditingMessage ? (
                  <div className="flex flex-col gap-2 flex-1">
                    <textarea 
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none resize-none flex-1 bg-white text-gray-800"
                      placeholder="Redact or clean message..."
                    />
                    <div className="flex justify-end gap-2 shrink-0">
                      <button onClick={() => setEditedMessage('')} className="p-1.5 text-red-500 hover:text-white bg-red-50 hover:bg-red-500 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                      <button onClick={handleSaveMessage} className="px-3 py-1 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors">
                        <Save size={12} /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100 flex-1 overflow-y-auto max-h-24">
                    {donation.message ? `"${donation.message}"` : <span className="text-gray-400 not-italic">No message provided.</span>}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3 border-t border-gray-100 shrink-0 mt-auto">
                <form action={updateDonationStatus.bind(null, donation.id, 'approved')} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors py-2.5 rounded-xl font-bold text-xs shadow-sm active:scale-95">
                    <Check size={16} strokeWidth={2.5} /> Approve Contribution
                  </button>
                </form>
                <form action={updateDonationStatus.bind(null, donation.id, 'rejected')} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 bg-white border border-gray-300 text-red-600 hover:bg-red-50 transition-colors py-2.5 rounded-xl font-bold text-xs shadow-sm active:scale-95">
                    <X size={16} strokeWidth={2.5} /> Reject
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= BACK: DATABASE FORENSICS ================= */
          <motion.div 
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col h-full w-full bg-[#0d1117] text-gray-300 font-mono text-xs"
          >
            {/* Inspector Title */}
            <div className="p-4 border-b border-gray-800 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-emerald-400" />
                <span className="font-bold text-gray-100 uppercase tracking-widest text-[11px]">Database Link Diagnostics</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isProfileLinked ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                {isProfileLinked ? 'PROFILE ATTACHED' : 'NO PROFILE ROW'}
              </span>
            </div>

            {/* Diagnostic Fields */}
            <div className="p-5 flex-1 flex flex-col gap-3 overflow-y-auto">
              
              <div className="bg-gray-900/90 p-2.5 rounded border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Donations Record ID</span>
                <span className="text-blue-400 select-all">{donation.id}</span>
              </div>

              <div className="bg-gray-900/90 p-2.5 rounded border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Foreign Key (user_id)</span>
                <span className="text-purple-400 select-all">{donation.user_id}</span>
              </div>

              <div className="bg-gray-900/90 p-2.5 rounded border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Resolved Profile Record</span>
                {isProfileLinked ? (
                  <div className="mt-1 space-y-0.5 text-gray-300 text-[11px]">
                    <p><span className="text-gray-500">Name:</span> {profile.name}</p>
                    <p><span className="text-gray-500">GitHub:</span> {profile.github_url || 'None'}</p>
                    <p><span className="text-gray-500">Portfolio:</span> {profile.portfolio_url || 'None'}</p>
                    <p><span className="text-gray-500">Banned Status:</span> {profile.is_banned ? 'TRUE' : 'FALSE'}</p>
                  </div>
                ) : (
                  <p className="text-red-400 mt-1">ERROR: No corresponding row found in `public.profiles` for this user_id.</p>
                )}
              </div>

              {/* Danger Zone */}
              <div className="mt-auto pt-2">
                <div className="border border-red-900/60 bg-red-950/30 p-3.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1 uppercase text-[10px]">
                    <ShieldAlert size={14} /> Ban Protocol
                  </div>
                  <p className="text-red-300/70 font-sans text-[11px] mb-3 leading-tight">
                    Marks user as banned in the database and revokes submission rights.
                  </p>
                  <button 
                    onClick={handleBan}
                    disabled={isBanning}
                    className="w-full py-2 bg-red-900/70 hover:bg-red-600 text-white font-bold rounded font-sans text-xs transition-colors flex items-center justify-center gap-1.5 border border-red-800 disabled:opacity-50"
                  >
                    <UserX size={14} /> {isBanning ? 'Executing Ban...' : `Ban ${donorName}`}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}