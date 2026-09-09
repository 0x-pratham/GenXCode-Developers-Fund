import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import AdminCardClient from './AdminCardClient'

export const revalidate = 0; // Prevent caching

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

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

  // FIX: Added message and user_id to the query
  const { data: pendingDonations } = await supabase
    .from('donations')
    .select(`
      id,
      user_id,
      amount,
      message,
      screenshot_url,
      created_at,
      profiles ( name )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  // Calculate Metrics
  const totalPendingAmount = pendingDonations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto p-6 py-16 relative z-10 min-h-[85vh]">
      
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-genx-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark tracking-tight mb-3 text-center md:text-left">
          Admin Control Panel
        </h1>
        
        {/* Executive Analytics Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-[1.5rem] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Queue Volume</p>
              <p className="text-3xl font-bold text-genx-dark tracking-tight">{pendingDonations?.length || 0} <span className="text-lg text-gray-400 font-medium">pending</span></p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-[1.5rem] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Capital</p>
              <p className="text-3xl font-bold text-emerald-600 tracking-tight">₹{totalPendingAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 font-bold text-xl">₹</div>
          </div>
        </div>
      </div>
      
      {(!pendingDonations || pendingDonations.length === 0) ? (
        <div className="text-center p-20 bg-white/80 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(34,7,73,0.04)] rounded-[2rem] flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-genx-dark mb-3 tracking-tight">Queue Cleared!</h2>
          <p className="text-gray-500 font-medium font-body text-lg max-w-md">
            All donations have been processed. Great work keeping the fund secure.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {pendingDonations.map((donation) => (
            <AdminCardClient key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  )
}