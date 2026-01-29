"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiSend, FiHelpCircle } from "react-icons/fi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
        setLoading(false);
        toast.success("Message sent! We'll get back to you shortly. 🚀");
        e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="border-b border-slate-100 p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/">
           <div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div>
        </Link>
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

      {/* --- HEADER --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Get in Touch</span>
        <h1 className="text-5xl font-black text-slate-900 mt-4 mb-6">
          We&apos;d love to hear from <span className="text-indigo-600">you</span>.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Have a question about our pricing, features, or need support? Our team is ready to answer all your questions.
        </p>
      </section>

      {/* --- CONTENT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Contact Info & FAQ */}
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <FiMail size={20} />
                     </div>
                     <h3 className="font-bold text-slate-900">Chat to us</h3>
                     <p className="text-slate-500 text-sm mt-1 mb-2">Our friendly team is here to help.</p>
                     <a href="mailto:hello@edunexus.com" className="text-indigo-600 font-bold text-sm hover:underline">hello@edunexus.com</a>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <FiMapPin size={20} />
                     </div>
                     <h3 className="font-bold text-slate-900">Visit us</h3>
                     <p className="text-slate-500 text-sm mt-1 mb-2">Come say hello at our office HQ.</p>
                     <p className="text-indigo-600 font-bold text-sm">100 Smith St, Collingwood VIC 3066</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <FiPhone size={20} />
                     </div>
                     <h3 className="font-bold text-slate-900">Call us</h3>
                     <p className="text-slate-500 text-sm mt-1 mb-2">Mon-Fri from 8am to 5pm.</p>
                     <p className="text-indigo-600 font-bold text-sm">+1 (555) 000-0000</p>
                  </div>
               </div>

               {/* FAQ Preview */}
               <div className="pt-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <FiHelpCircle /> Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                     <details className="group p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
                        <summary className="font-bold text-slate-700 flex justify-between items-center list-none">
                           How do I get a demo? 
                           <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-slate-500 mt-2 text-sm">Just fill out the form and our sales team will contact you within 24 hours.</p>
                     </details>
                     <details className="group p-4 bg-white border border-slate-200 rounded-xl cursor-pointer">
                        <summary className="font-bold text-slate-700 flex justify-between items-center list-none">
                           Is there a free trial?
                           <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-slate-500 mt-2 text-sm">Yes! We offer a 14-day free trial for all schools and institutions.</p>
                     </details>
                  </div>
               </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
               <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                        <input type="text" required className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Rahul" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                        <input type="text" required className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Kumar" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                     <input type="email" required className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="rahul@example.com" />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                     <textarea required rows="4" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="Tell us how we can help..."></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                     {loading ? "Sending..." : <><FiSend /> Send Message</>}
                  </button>
               </form>
            </div>

         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-100 py-10 text-center bg-slate-50">
         <p className="text-slate-400 text-sm font-bold">
            © 2025 EduNexus Inc.
         </p>
         <Link href="/">
            <button className="mt-4 text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
               <FiArrowLeft /> Back to Home
            </button>
         </Link>
      </footer>

    </div>
  );
}