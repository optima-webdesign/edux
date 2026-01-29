import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiUsers, FiAward, FiGlobe } from "react-icons/fi";

export default function AboutPage() {
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

      {/* --- HERO SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Our Mission</span>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 mb-6 leading-tight">
          Empowering the Next Generation <br/> of <span className="text-indigo-600">Learners</span>.
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed">
          EduNexus is more than just an LMS. It&apos;s a complete ecosystem designed to bridge the gap between students, teachers, and parents using cutting-edge technology.
        </p>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-slate-900 text-white py-16">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
               <div className="text-4xl font-bold text-indigo-400 mb-2">50K+</div>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Students</div>
            </div>
            <div>
               <div className="text-4xl font-bold text-indigo-400 mb-2">1,200+</div>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Instructors</div>
            </div>
            <div>
               <div className="text-4xl font-bold text-indigo-400 mb-2">300+</div>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Courses</div>
            </div>
            <div>
               <div className="text-4xl font-bold text-indigo-400 mb-2">4.9/5</div>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">User Rating</div>
            </div>
         </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  <FiGlobe />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Accessible Everywhere</h3>
               <p className="text-slate-500 leading-relaxed">
                  Whether you are on a laptop in New York or a mobile in Mumbai, EduNexus works seamlessly across all devices.
               </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  <FiAward />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Industry Standard</h3>
               <p className="text-slate-500 leading-relaxed">
                  Our curriculum is designed by industry experts to ensure students are ready for the real world.
               </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
               <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
                  <FiUsers />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Community First</h3>
               <p className="text-slate-500 leading-relaxed">
                  We believe in the power of community. Our platform encourages collaboration between students and mentors.
               </p>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-100 py-10 text-center">
         <p className="text-slate-400 text-sm font-bold">
            © 2025 EduNexus Inc. All rights reserved.
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