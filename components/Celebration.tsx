'use client';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, X } from 'lucide-react';

export default function Celebration({ latestApprovedId }: { latestApprovedId: string | null }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!latestApprovedId) return;

    const celebratedKey = `celebrated_${latestApprovedId}`;
    const hasCelebrated = localStorage.getItem(celebratedKey);

    if (!hasCelebrated) {
      // 1. Fire Confetti tailored to the new Luxury Light Theme (Purple, Light Purple, Gold, Emerald)
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#5e2396', '#c7a6f3', '#f59e0b', '#10b981']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#5e2396', '#c7a6f3', '#f59e0b', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setShowModal(true);
      localStorage.setItem(celebratedKey, 'true');
    }
  }, [latestApprovedId]);

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-genx-dark/20 backdrop-blur-md transition-all">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md p-10 bg-white/95 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_60px_rgba(34,7,73,0.15)] text-center flex flex-col items-center"
          >
            {/* Elegant Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-genx-dark hover:bg-gray-100 p-2 rounded-full transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Premium Icon Container */}
            <div className="w-20 h-20 bg-genx-soft rounded-full flex items-center justify-center mb-6 text-genx-primary shadow-inner border border-genx-primary/10">
              <PartyPopper size={36} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-3xl font-heading font-bold text-genx-dark tracking-tight mb-3">
              Donation Approved!
            </h2>
            <p className="text-gray-600 font-body font-medium mb-8 leading-relaxed">
              Your contribution has been successfully verified. You have officially claimed your spot in the GenXCode Hall of Fame.
            </p>
            
            {/* Luxury Pill Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-4 bg-genx-primary text-white text-lg font-bold rounded-full hover:bg-genx-dark hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_20px_rgba(94,35,150,0.2)] hover:shadow-[0_12px_25px_rgba(34,7,73,0.3)]"
            >
              Continue to Dashboard
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}