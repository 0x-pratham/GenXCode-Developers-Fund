import Link from 'next/link';
import { FileText, AlertTriangle, Scale, Ban } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | GenXCode Developers Fund',
  description: 'Rules and regulations for participating in the fund.',
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 min-h-[85vh] relative z-10">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6 text-genx-dark">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-genx-dark mb-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-gray-500 font-medium">Effective Date: September 2026</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_12px_40px_rgba(34,7,73,0.04)] p-8 md:p-12 space-y-10 text-gray-600 font-body leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4 flex items-center gap-2">
            <Scale size={20} className="text-genx-primary" /> 1. Acceptance of Terms
          </h2>
          <p>
            By authenticating, accessing the Patron Dashboard, or submitting payment proofs to the GenXCode Developers Fund, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the platform.
          </p>
        </section>

        <section className="bg-red-50/50 border border-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-heading font-bold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" /> 2. Final Contribution Policy (No Refunds)
          </h2>
          <p className="text-red-800/80 mb-3 font-medium">
            The GenXCode Developers Fund operates to provide immediate financial aid to students participating in hackathons. Therefore:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-red-400 text-red-800/80 font-medium">
            <li>All monetary contributions made via the provided UPI IDs (to authorized receivers like Rohit or Samruddhi) are strictly voluntary.</li>
            <li>Once a payment is successfully processed by your bank and verified by our administrators, it is considered a <strong>final, non-refundable donation</strong>.</li>
            <li>We cannot reverse, replace, or refund transactions under any circumstances once the capital has been allocated to the fund.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4">3. Verification & Processing</h2>
          <p>
            Submitting a screenshot through the Patron Dashboard does not automatically guarantee Hall of Fame placement. All transactions are manually audited. GenXCode administrators reserve the right to reject any submission if the payment proof is unclear, duplicated, or suspected to be fraudulent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4 flex items-center gap-2">
            <Ban size={20} className="text-genx-primary" /> 4. User Conduct & Banning
          </h2>
          <p className="mb-4">You agree not to misuse the platform. Administrators maintain a zero-tolerance policy for:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-genx-primary">
            <li>Submitting forged, edited, or fake payment screenshots.</li>
            <li>Uploading inappropriate, offensive, or copyrighted imagery as an Avatar.</li>
            <li>Including spam, hate speech, or malicious links in your Profile Bio or "Message to the Builders".</li>
          </ul>
          <p className="mt-4">
            Violating these rules will result in an immediate, permanent ban from the platform, rejection of all pending statuses, and removal from the Hall of Fame.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-genx-dark mb-4">5. Platform Disclaimer</h2>
          <p>
            The GenXCode Developers Fund platform is provided "as is" and "as available". While we strive for 100% uptime and secure data handling, we are not liable for external UPI gateway failures, bank processing errors, or delays in administrative verification.
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