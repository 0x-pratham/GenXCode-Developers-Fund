import { createClient } from '@/utils/supabase/server';
import LandingHero from '@/components/LandingHero';
import FundingProgress from '@/components/FundingProgress';
import DonationBenefits from '@/components/DonationBenefits';

export const revalidate = 0;

export default async function LandingPage() {
  const supabase = await createClient();
  const TARGET_GOAL = 50000;

  // Aggregate query to get the sum of all approved donations
  const { data, error } = await supabase
    .from('donations')
    .select('amount')
    .eq('status', 'approved');

  // Calculate total securely on the server
  const totalFunded = data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-24 relative overflow-hidden pb-40">
      
      {/* 
        PERFORMANCE UPGRADE: 
        Added transform-gpu, translate-z-0, and will-change-transform.
        This forces the browser to paint these heavy blurs on the GPU, completely eliminating scroll lag.
      */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-genx-accent/20 rounded-full blur-[120px] -z-10 pointer-events-none transform-gpu translate-z-0 will-change-transform"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-genx-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none transform-gpu translate-z-0 will-change-transform"></div>

      {/* Hero Section */}
      <LandingHero />

      {/* Dynamic Funding Progress Tracker */}
      <FundingProgress currentAmount={totalFunded} targetAmount={TARGET_GOAL} />

      {/* Benefits Section */}
      <DonationBenefits />
      
    </div>
  );
}