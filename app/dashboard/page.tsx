import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Celebration from '@/components/Celebration'
import ProfileTab from '@/components/dashboard/ProfileTab'
import DonationsTab from '@/components/dashboard/DonationsTab'

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;
  const currentTab = tab || 'donations';
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  // Fetch Donations
  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const approvedDonations = donations?.filter(
    (donation) => donation.status === 'approved'
  ) || []

  const latestApprovedId = approvedDonations.length > 0 ? approvedDonations[0].id : null
  
  // Calculate Lifetime Impact & Tier
  const totalImpact = approvedDonations.reduce((sum, d) => sum + Number(d.amount), 0)
  let tier = { name: 'Bronze Patron', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (totalImpact >= 10000) tier = { name: 'Diamond Patron', color: 'text-blue-700 bg-blue-50 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]' };
  else if (totalImpact >= 2500) tier = { name: 'Silver Patron', color: 'text-slate-700 bg-slate-50 border-slate-300' };

  return (
    <div className="max-w-6xl mx-auto p-6 py-16 relative z-10 min-h-[85vh]">
      
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-genx-accent/15 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {currentTab === 'donations' && <Celebration latestApprovedId={latestApprovedId} />}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark tracking-tight mb-3">
            {currentTab === 'donations' ? 'Donor Dashboard' : 'Identity Hub'}
          </h1>
          <p className="text-gray-600 font-body text-lg font-medium">
            {currentTab === 'donations' 
              ? 'Manage your contributions and submit transaction proofs.' 
              : 'Customize your public profile for the Hall of Fame.'}
          </p>
        </div>
        
        {/* Premium Dashboard Tabs */}
        <div className="flex bg-white/60 p-1.5 rounded-full shadow-inner border border-white backdrop-blur-md self-start">
          <Link 
            href="?tab=donations"
            className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${currentTab === 'donations' ? 'bg-genx-dark text-white shadow-md' : 'text-gray-500 hover:text-genx-dark'}`}
          >
            Donations
          </Link>
          <Link 
            href="?tab=profile"
            className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${currentTab === 'profile' ? 'bg-genx-dark text-white shadow-md' : 'text-gray-500 hover:text-genx-dark'}`}
          >
            Profile Setup
          </Link>
        </div>
      </div>
      
      {currentTab === 'profile' ? (
        <ProfileTab profile={profile} totalImpact={totalImpact} tier={tier} />
      ) : (
        <DonationsTab donations={donations || []} />
      )}

    </div>
  )
}