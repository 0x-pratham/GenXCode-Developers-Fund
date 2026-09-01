import AboutHero from '@/components/about/AboutHero';
import AboutMotive from '@/components/about/AboutMotive';
import AboutWhyDonate from '@/components/about/AboutWhyDonate';
import AboutCTA from '@/components/about/AboutCTA';

export default function AboutPage() {
  return (
    <div className="w-full relative z-10 min-h-screen overflow-hidden pb-32">
      {/* GPU-Accelerated Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-genx-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none transform-gpu translate-z-0 will-change-transform"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-genx-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-y-1/2 -translate-x-1/2 transform-gpu translate-z-0 will-change-transform"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <AboutHero />
        <AboutMotive />
        <AboutWhyDonate />
        <AboutCTA />
      </div>
    </div>
  );
}