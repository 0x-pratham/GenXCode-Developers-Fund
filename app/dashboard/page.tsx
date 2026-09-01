import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PaymentQR from '@/components/PaymentQR'
import Celebration from '@/components/Celebration'
import { submitDonation } from './actions'
import { UploadCloud, CheckCircle2, Clock, XCircle, FileImage } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const approvedDonations = donations?.filter(
    (donation) => donation.status === 'approved'
  ) || []

  const latestApprovedId =
    approvedDonations.length > 0
      ? approvedDonations[0].id
      : null

  return (
    <div className="max-w-6xl mx-auto p-6 py-16 relative z-10 min-h-[85vh]">
      
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-genx-accent/15 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <Celebration latestApprovedId={latestApprovedId} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark tracking-tight mb-3">
          Donor Dashboard
        </h1>
        <p className="text-gray-600 font-body text-lg font-medium">
          Manage your contributions and submit transaction proofs securely.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        
        {/* Left Column: QR Code (Already Styled) */}
        <div className="w-full">
          <PaymentQR />
        </div>

        {/* Right Column: Upload Form */}
        <div className="p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_60px_rgba(34,7,73,0.06)] flex flex-col h-full">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-genx-primary/10 flex items-center justify-center text-genx-primary">
              <UploadCloud size={20} />
            </div>
            <h2 className="text-2xl font-heading font-bold text-genx-dark tracking-tight">Submit Payment Proof</h2>
          </div>

          <form action={submitDonation} className="flex flex-col gap-6 flex-grow">
            <div>
              <label className="block text-gray-600 font-semibold text-sm mb-2 ml-1">
                Amount Donated (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input 
                  name="amount" 
                  type="number" 
                  min="1"
                  required 
                  className="w-full pl-10 p-4 rounded-xl bg-white border border-gray-200 text-genx-dark font-bold text-lg placeholder:text-gray-300 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                  placeholder="500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-600 font-semibold text-sm mb-2 ml-1">
                Transaction Screenshot
              </label>
              <input 
                name="screenshot" 
                type="file" 
                accept="image/*"
                required 
                className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-500 font-medium focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-genx-primary/10 file:text-genx-primary hover:file:bg-genx-primary hover:file:text-white file:transition-all file:cursor-pointer cursor-pointer"
              />
            </div>

            <div className="mt-auto pt-6">
              <button type="submit" className="w-full px-6 py-4 bg-genx-primary text-white hover:bg-genx-dark transition-all duration-300 rounded-full font-bold shadow-[0_8px_20px_rgba(94,35,150,0.2)] hover:shadow-[0_12px_25px_rgba(34,7,73,0.3)] hover:-translate-y-0.5">
                Submit for Verification
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section: Donation History */}
      <h2 className="text-3xl font-heading font-bold text-genx-dark mb-6 tracking-tight">Your Contribution History</h2>
      
      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_12px_40px_rgba(34,7,73,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Proof</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations?.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-5 text-gray-600 font-medium">
                    {new Date(donation.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-5 font-bold text-genx-dark text-lg">
                    ₹{donation.amount.toLocaleString()}
                  </td>
                  <td className="p-5">
                    <a href={donation.screenshot_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-genx-primary hover:text-genx-dark transition-colors bg-genx-primary/5 px-4 py-2 rounded-full border border-genx-primary/10">
                      <FileImage size={16} />
                      View Image
                    </a>
                  </td>
                  <td className="p-5">
                    {/* Engineered Status Pills */}
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
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
              ))}
              {(!donations || donations.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-300 mb-4">
                      <FileImage size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-genx-dark mb-1">No Contributions Yet</h3>
                    <p className="text-gray-500 font-medium">Your donation history will appear here once submitted.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}