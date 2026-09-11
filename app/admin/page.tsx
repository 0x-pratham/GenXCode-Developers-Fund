import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import AdminCardClient from './AdminCardClient'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 relative w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} strokeWidth={2} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Access Denied
          </h1>

          <p className="text-gray-500 font-medium">
            This secure sector is restricted to GenXCode administrators.
          </p>
        </div>
      </div>
    )
  }

  // Fetch all pending donations with complete profile information
  const { data: pendingDonations, error } = await supabase
    .from('donations')
    .select(`
      id,
      user_id,
      amount,
      message,
      screenshot_url,
      status,
      created_at,
      profiles (
        id,
        name,
        avatar_url,
        github_url,
        portfolio_url,
        bio,
        is_banned
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Admin Fetch Error:', error.message)
  }

  const totalPendingAmount =
    pendingDonations?.reduce(
      (sum, donation) => sum + Number(donation.amount),
      0
    ) || 0

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 min-h-[85vh]">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="mb-10 border-b border-gray-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
          Admin Control Panel
        </h1>

        <p className="text-gray-500 font-medium">
          Verify and moderate incoming GenXCode Fund contributions.
        </p>

        {/* Executive Analytics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Queue Volume
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {pendingDonations?.length || 0}{' '}
                <span className="text-sm text-gray-400 font-medium">
                  pending
                </span>
              </p>
            </div>

            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 border border-amber-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-amber-500"></span>
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Pending Capital
              </p>

              <p className="text-2xl font-bold text-emerald-600">
                ₹{totalPendingAmount.toLocaleString()}
              </p>
            </div>

            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">
              ₹
            </div>
          </div>
        </div>
      </div>

      {(!pendingDonations || pendingDonations.length === 0) ? (
        <div className="text-center p-16 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} strokeWidth={2} />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Queue Cleared
          </h2>

          <p className="text-gray-500">
            All pending donations have been successfully processed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {pendingDonations.map((donation) => (
            <AdminCardClient
              key={donation.id}
              donation={donation}
            />
          ))}
        </div>
      )}
    </div>
  )
}