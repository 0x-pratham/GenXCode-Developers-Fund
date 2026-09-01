import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateDonationStatus } from './actions'
import { CheckCircle2, ShieldAlert, Maximize2, Check, X, Inbox } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  // Check if the current user is an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="bg-white/80 backdrop-blur-xl border border-white p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(34,7,73,0.08)] text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-genx-dark tracking-tight mb-3">Access Denied</h1>
          <p className="text-gray-500 font-body font-medium">This secure area is restricted to GenXCode administrators only.</p>
        </div>
      </div>
    )
  }

  // Fetch all pending donations
  const { data: pendingDonations } = await supabase
    .from('donations')
    .select(`
      id,
      amount,
      screenshot_url,
      created_at,
      profiles ( name )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto p-6 py-16 relative z-10 min-h-[85vh]">
      
      {/* Engineered Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-genx-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark tracking-tight mb-3">
            Admin Control Panel
          </h1>
          <p className="text-gray-600 font-body text-lg font-medium">
            Verify and securely approve GenXCode Fund contributions.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-gray-100 px-5 py-2.5 rounded-full shadow-sm flex items-center gap-3 w-fit mx-auto md:mx-0">
          <span className="relative flex h-3 w-3">
            {pendingDonations && pendingDonations.length > 0 ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            )}
          </span>
          <span className="text-sm font-bold text-gray-600 font-body">
            {pendingDonations?.length || 0} Pending Reviews
          </span>
        </div>
      </div>
      
      {(!pendingDonations || pendingDonations.length === 0) ? (
        <div className="text-center p-20 bg-white/80 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(34,7,73,0.04)] rounded-[2rem] flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-genx-dark mb-3 tracking-tight">All Caught Up!</h2>
          <p className="text-gray-500 font-medium font-body text-lg max-w-md">
            There are currently no pending donations to review. The queue is perfectly clear.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingDonations.map((donation) => (
            <div key={donation.id} className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_12px_35px_rgba(34,7,73,0.06)] overflow-hidden flex flex-col group hover:shadow-[0_20px_50px_rgba(34,7,73,0.1)] transition-shadow duration-500">
              
              {/* Luxury Image Viewer */}
              <div className="h-60 bg-gray-50 relative overflow-hidden border-b border-gray-100">
                <img 
                  src={donation.screenshot_url} 
                  alt="Payment Proof" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <a 
                  href={donation.screenshot_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-genx-dark font-bold gap-2"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform">
                    <Maximize2 size={20} className="text-genx-dark" />
                  </div>
                  <span className="text-sm uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full shadow-sm mt-2">Expand</span>
                </a>
              </div>
              
              {/* Refined Donation Details */}
              <div className="p-8 flex-1 flex flex-col bg-gradient-to-b from-transparent to-gray-50/30">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-genx-dark tracking-tight mb-1">
                      {/* @ts-ignore */}
                      {donation.profiles?.name || 'Unknown User'}
                    </h3>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {new Date(donation.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                    <span className="text-2xl font-body font-bold text-emerald-600 tracking-tight">₹{donation.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tactile Action Buttons */}
                <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100">
                  <form action={updateDonationStatus.bind(null, donation.id, 'approved')} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 py-3.5 rounded-full font-bold shadow-[0_8px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5">
                      <Check size={18} strokeWidth={2.5} />
                      Approve
                    </button>
                  </form>
                  
                  <form action={updateDonationStatus.bind(null, donation.id, 'rejected')} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-300 py-3 rounded-full font-bold shadow-sm hover:-translate-y-0.5">
                      <X size={18} strokeWidth={2.5} />
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}