import { createClient } from '@/utils/supabase/server';
import HallOfFameRow from '@/components/HallOfFameRow';

export const revalidate = 0; // Ensures the page fetches fresh data

export default async function HallOfFame() {
  const supabase = await createClient();
  
  // Call the secure Postgres function
  const { data: donors } = await supabase.rpc('get_hall_of_fame');

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 min-h-[85vh] relative z-10">
      
      {/* Luxury soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-genx-accent/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-genx-dark mb-5 tracking-tight">
          GenXCode Hall of Fame
        </h1>
        <p className="text-gray-600 font-body text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Honoring the legendary developers who fuel our community and empower the next generation.
        </p>
      </div>
      
      <div className="space-y-4 relative">
        {donors && donors.length > 0 ? (
          donors.map((donor: { donor_name: string; total_amount: number }, index: number) => (
            <HallOfFameRow 
              key={index}
              index={index}
              name={donor.donor_name}
              amount={donor.total_amount}
            />
          ))
        ) : (
          <div className="text-center p-16 bg-white/70 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(34,7,73,0.06)] rounded-[2rem]">
            <h2 className="text-3xl font-heading font-bold text-genx-dark mb-3 tracking-tight">
              The Hall is currently empty.
            </h2>
            <p className="text-gray-500 font-medium font-body text-lg">
              Be the first to claim the #1 spot and etch your name into GenXCode history!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}