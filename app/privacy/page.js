 import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
       {/* Navbar */}
       <nav className="border-b border-slate-100 p-6 max-w-5xl mx-auto">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600">EduNexus.</div></Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
         <h1 className="text-4xl font-black text-slate-900 mb-2">Privacy Policy</h1>
         <p className="text-slate-500 font-bold mb-10">Last Updated: October 2025</p>

         <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
               <p>
                  We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, and payment information.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Data</h2>
               <p>We use the information we collect to:</p>
               <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Provide, maintain, and improve our services.</li>
                  <li>Process transactions and send related information.</li>
                  <li>Send you technical notices, updates, and support messages.</li>
                  <li>Monitor and analyze trends and usage.</li>
               </ul>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
               <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-3">4. Contact Us</h2>
               <p>
                  If you have any questions about this Privacy Policy, please contact us at <span className="text-indigo-600 font-bold">privacy@edunexus.com</span>.
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