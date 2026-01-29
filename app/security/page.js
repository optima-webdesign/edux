import Link from "next/link";
import { FiArrowLeft, FiShield, FiLock, FiServer, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
       {/* Navbar */}
       <nav className="border-b border-slate-100 p-6 max-w-5xl mx-auto">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div></Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
         {/* Hero */}
         <div className="text-center mb-16">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
               <FiShield />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
               Security First. Always.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
               We treat your data with the highest level of security. Our platform is built on enterprise-grade infrastructure to ensure safety, reliability, and privacy.
            </p>
         </div>

         {/* Security Pillars Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
               <FiLock className="text-4xl text-indigo-600 mb-4" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">Data Encryption</h3>
               <p className="text-slate-500 leading-relaxed">
                  All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption. Your passwords are never stored in plain text; we use industry-standard hashing algorithms (Bcrypt).
               </p>
            </div>
            <div className="p-8 border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
               <FiServer className="text-4xl text-indigo-600 mb-4" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Infrastructure</h3>
               <p className="text-slate-500 leading-relaxed">
                  EduNexus is hosted on Vercel and AWS (Amazon Web Services), ensuring 99.9% uptime and world-class physical security at data centers.
               </p>
            </div>
            <div className="p-8 border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
               <FiCheckCircle className="text-4xl text-indigo-600 mb-4" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">Regular Backups</h3>
               <p className="text-slate-500 leading-relaxed">
                  We perform automated daily backups of our entire database. In the unlikely event of data loss, we can restore your institution's data to a precise point in time.
               </p>
            </div>
            <div className="p-8 border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
               <FiShield className="text-4xl text-indigo-600 mb-4" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">Access Control</h3>
               <p className="text-slate-500 leading-relaxed">
                  We implement strict Role-Based Access Control (RBAC). A student cannot see another student's grades, and teachers can only modify data for their assigned classes.
               </p>
            </div>
         </div>

         {/* Compliance Section */}
         <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Compliance & Standards</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
               <span className="bg-white px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 shadow-sm">GDPR Ready</span>
               <span className="bg-white px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 shadow-sm">SOC 2 Compliant</span>
               <span className="bg-white px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 shadow-sm">ISO 27001</span>
               <span className="bg-white px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 shadow-sm">FERPA</span>
            </div>
         </div>

         {/* Vulnerability Reporting */}
         <div className="border-t border-slate-100 pt-16">
            <div className="flex flex-col md:flex-row items-start gap-6">
               <div className="bg-orange-50 text-orange-600 p-4 rounded-full">
                  <FiAlertTriangle size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Report a Vulnerability</h3>
                  <p className="text-slate-500 mb-4">
                     Security is a community effort. If you believe you’ve found a security bug in EduNexus, we are happy to work with you to resolve the issue promptly.
                  </p>
                  <a href="mailto:security@edunexus.com" className="text-indigo-600 font-bold hover:underline">
                     Contact Security Team &rarr;
                  </a>
               </div>
            </div>
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