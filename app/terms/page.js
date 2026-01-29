import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
       {/* Navbar */}
       <nav className="border-b border-slate-100 p-6 max-w-5xl mx-auto">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div></Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
         <h1 className="text-4xl font-black text-slate-900 mb-2">Terms of Service</h1>
         <p className="text-slate-500 font-bold mb-10">Last Updated: October 2025</p>

         <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
               <p>
                  By accessing and using EduNexus, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">2. User Accounts</h2>
               <p>
                  To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
               </p>
               <p className="mt-2 bg-yellow-50 p-4 rounded-lg text-sm border-l-4 border-yellow-400 text-slate-700">
                  <strong>Important:</strong> You are responsible for safeguarding your password. EduNexus cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">3. Intellectual Property</h2>
               <p>
                  The Site and its original content, features, and functionality are owned by EduNexus and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">4. Termination</h2>
               <p>
                  We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
               <p>
                  In no event shall EduNexus, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">6. Changes to Terms</h2>
               <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
               <p>
                  If you have any questions about these Terms, please contact us at <span className="text-indigo-600 font-bold">legal@edunexus.com</span>.
               </p>
            </section>
         </div>
      </main>

      <footer className="border-t border-slate-100 py-10 text-center max-w-5xl mx-auto">
         <Link href="/">
            <button className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
               <FiArrowLeft /> Back to Home
            </button>
         </Link>
      </footer>
    </div>
  );
}