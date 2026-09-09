import { createClient } from '@/utils/supabase/server';
import HallOfFameClient from './HallOfFameClient';

export const revalidate = 0; // Ensures the page fetches fresh data

export default async function HallOfFame() {
  const supabase = await createClient();
  
  // Call the newly upgraded secure Postgres function
  const { data: donors } = await supabase.rpc('get_hall_of_fame');

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 min-h-[85vh] relative z-10">
      
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
      
      {/* Pass the enriched data to the interactive client component */}
      <HallOfFameClient donors={donors || []} />
      
    </div>
  );
}