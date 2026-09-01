import { Sparkles } from 'lucide-react';

interface Activity {
  name: string;
  amount: number;
}

export default function ActivityTicker({ activities }: { activities: Activity[] }) {
  if (!activities || activities.length === 0) return null;

  // Duplicate the array to create a seamless infinite scroll loop
  const duplicatedActivities = [...activities, ...activities, ...activities];

  return (
    <div className="w-full bg-white/70 border-y border-white shadow-[0_-4px_20px_rgba(34,7,73,0.03)] overflow-hidden py-3.5 absolute bottom-0 left-0 backdrop-blur-xl z-20">
      <div className="flex w-max animate-marquee items-center">
        {duplicatedActivities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 px-10 border-r border-gray-200/80"
          >
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-gray-600 font-body text-sm font-medium whitespace-nowrap tracking-wide">
              <strong className="text-genx-dark font-bold">{activity.name}</strong> just funded{' '}
              <strong className="text-emerald-600 font-bold">₹{activity.amount}</strong>!
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}