"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiCheck, FiHelpCircle, FiX } from "react-icons/fi";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navbar */}
      <nav className="border-b border-slate-100 p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div></Link>
        <div className="flex gap-4">
           <Link href="/login">
              <button className="text-slate-600 font-bold hover:text-indigo-600 px-4 py-2">Login</button>
           </Link>
           <Link href="/login">
              <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition-all">
                Get Started
              </button>
           </Link>
        </div>
      </nav>

      <main className="py-20 px-6">
         
         {/* Header & Toggle */}
         <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Pricing Plans</span>
            <h1 className="text-5xl font-black text-slate-900 mt-4 mb-6">
               Simple, transparent pricing.
            </h1>
            <p className="text-xl text-slate-500 mb-8">
               No hidden fees. No credit card required for trial. Cancel anytime.
            </p>

            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center gap-4">
               <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
               <button 
                 onClick={() => setIsAnnual(!isAnnual)}
                 className={`w-14 h-8 flex items-center bg-slate-200 rounded-full p-1 transition-all duration-300 ${isAnnual ? 'bg-indigo-600' : ''}`}
               >
                  <div className={`bg-white w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </button>
               <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                  Yearly <span className="text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded-full ml-1">-20%</span>
               </span>
            </div>
         </div>

         {/* Pricing Cards */}
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            
            {/* 1. Starter Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all relative">
               <h3 className="text-xl font-bold text-slate-900">Starter</h3>
               <p className="text-slate-500 text-sm mt-1">For individual tutors.</p>
               <div className="my-6">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-slate-500 font-bold">/mo</span>
               </div>
               <Link href="/login">
                  <button className="w-full bg-slate-50 text-slate-900 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">Start for Free</button>
               </Link>
               <div className="mt-8 space-y-4">
                  <Feature text="Up to 50 Students" />
                  <Feature text="2 GB Storage" />
                  <Feature text="Basic Quizzes" />
                  <Feature text="Email Support" />
                  <Feature text="Live Classes (Zoom)" excluded />
                  <Feature text="Custom Domain" excluded />
               </div>
            </div>

            {/* 2. Growth Plan (Highlighted) */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl relative transform md:-translate-y-4">
               <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">MOST POPULAR</div>
               <h3 className="text-xl font-bold">Growth</h3>
               <p className="text-slate-400 text-sm mt-1">For growing schools.</p>
               <div className="my-6">
                  <span className="text-4xl font-black text-white">${isAnnual ? '39' : '49'}</span>
                  <span className="text-slate-400 font-bold">/mo</span>
               </div>
               <Link href="/login">
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/50">Get Started</button>
               </Link>
               <div className="mt-8 space-y-4">
                  <Feature text="Up to 500 Students" />
                  <Feature text="50 GB Storage" />
                  <Feature text="Advanced Analytics" />
                  <Feature text="HD Live Classes" />
                  <Feature text="Payment Gateway" />
                  <Feature text="Parent Portal Access" />
                  <Feature text="Custom Branding" excluded />
               </div>
            </div>

            {/* 3. Enterprise Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all">
               <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
               <p className="text-slate-500 text-sm mt-1">For large institutions.</p>
               <div className="my-6">
                  <span className="text-4xl font-black text-slate-900">Custom</span>
               </div>
               <Link href="/contact">
                  <button className="w-full bg-white text-indigo-600 border border-indigo-200 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">Contact Sales</button>
               </Link>
               <div className="mt-8 space-y-4">
                  <Feature text="Unlimited Students" />
                  <Feature text="Unlimited Storage" />
                  <Feature text="White-label Mobile App" />
                  <Feature text="Dedicated Success Manager" />
                  <Feature text="SLA & Priority Support" />
                  <Feature text="API Access" />
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
               <FaqItem q="Can I cancel anytime?" a="Yes, there are no long-term contracts for the Starter and Growth plans. You can cancel your subscription at any time." />
               <FaqItem q="Is there a setup fee?" a="No! There are absolutely no setup fees. You just pay the subscription fee." />
               <FaqItem q="Do you offer discounts for non-profits?" a="Yes! We love supporting education. Contact our sales team for special NGO pricing." />
               <FaqItem q="How secure is my data?" a="We use bank-level encryption (AES-256) and host everything on secure AWS servers with daily backups." />
            </div>
         </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 text-center max-w-7xl mx-auto">
         <Link href="/">
            <button className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
               <FiArrowLeft /> Back to Home
            </button>
         </Link>
      </footer>
    </div>
  );
}

// Helper Components
function Feature({ text, excluded = false }) {
   return (
      <div className={`flex items-center gap-3 ${excluded ? 'opacity-50' : ''}`}>
         <div className={`w-5 h-5 rounded-full flex items-center justify-center ${excluded ? 'bg-slate-100 text-slate-400' : 'bg-green-100 text-green-600'}`}>
            {excluded ? <FiX size={12} /> : <FiCheck size={12} />}
         </div>
         <span className={`text-sm font-bold ${excluded ? 'text-slate-400 decoration-slate-300' : 'text-slate-600'}`}>
            {text}
         </span>
      </div>
   );
}

function FaqItem({ q, a }) {
   return (
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
         <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
            <FiHelpCircle className="text-indigo-600" /> {q}
         </h4>
         <p className="text-slate-500 text-sm ml-6">{a}</p>
      </div>
   );
}