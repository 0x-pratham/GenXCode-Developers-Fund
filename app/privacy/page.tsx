import Link from 'next/link';
import { ShieldCheck, Mail, Database, Eye } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | GenXCode Developers Fund',
  description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 min-h-[85vh] relative z-10">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-genx-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6 text-genx-primary">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 font-medium">Last Updated: September 2026</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_12px_40px_rgba(34,7,73,0.04)] p-8 md:p-12 space-y-10 text-gray-600 font-body leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4 flex items-center gap-2">
            <Database size={20} className="text-genx-primary" /> 1. Information We Collect
          </h2>
          <p className="mb-4">When you authenticate and participate in the GenXCode Developers Fund, we securely collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-genx-primary">
            <li><strong className="text-genx-dark">Authentication Data:</strong> Your name, email address, and profile picture provided by your OAuth provider (Google or GitHub).</li>
            <li><strong className="text-genx-dark">Profile Data:</strong> Optional links to your GitHub, personal portfolio, and a short biography that you provide via the Identity Hub.</li>
            <li><strong className="text-genx-dark">Transaction Data:</strong> The declared donation amount, transaction timestamps, and the payment proof screenshots you upload for verification.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4 flex items-center gap-2">
            <Eye size={20} className="text-genx-primary" /> 2. How We Use Your Data
          </h2>
          <p className="mb-4">The core mission of this platform is transparency and community recognition. We use your data strictly to:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-genx-primary">
            <li>Verify your financial contributions through our Admin Control Panel.</li>
            <li>Display your public profile (Name, Avatar, Bio, Links, and Total Impact) on our public <strong>Hall of Fame</strong> leaderboard.</li>
            <li>Calculate and assign your Dynamic Legacy Tier (Bronze, Silver, Diamond).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4">3. Data Storage & Security</h2>
          <p>
            Your data and payment proofs are stored securely utilizing Supabase's encrypted PostgreSQL databases and isolated storage buckets. Transaction screenshots are strictly used for verification purposes by authorized administrators and are not distributed to third-party advertisers. 
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4">4. Public Visibility & Moderation</h2>
          <p>
            By submitting a donation and updating your profile, you consent to having your name, avatar, and total contribution amount displayed publicly on the GenXCode platform. Our administrators reserve the right to moderate, redact, or delete user-provided biographies or "Messages to the Builders" if they contain inappropriate content or spam.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4 flex items-center gap-2">
            <Mail size={20} className="text-genx-primary" /> 5. Contact Us
          </h2>
          <p>
            If you have concerns regarding your data, wish to anonymize your profile on the Hall of Fame, or need to request account deletion, please reach out to the core GenXCode team or administrators directly.
          </p>
        </section>

      </div>
      
      <div className="text-center mt-10">
        <Link href="/" className="text-genx-primary font-bold hover:text-genx-dark transition-colors">
          &larr; Return to Homepage
        </Link>
      </div>
    </div>
  );
}