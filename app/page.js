import Link from "next/link";
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiLayout, 
  FiUsers, 
  FiBarChart2, 
  FiShield, 
  FiPlayCircle 
} from "react-icons/fi";
import { FaUniversity, FaSchool, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* ----------------- NAVBAR ----------------- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">EduNexus.</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="/features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="/solutions" className="hover:text-indigo-600 transition-colors">Solutions</a>
            <a href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="/resources" className="hover:text-indigo-600 transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-slate-600 font-medium hover:text-indigo-600">
              Log in
            </Link>
            <Link href="/login">
              <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ----------------- HERO SECTION ----------------- */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        
        {/* Decorative Gradients */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/50 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          v2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
          Manage your institution <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            like a Fortune 500.
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one OS for schools & universities. Streamline admissions, 
          automate attendance, and deliver world-class live learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/login">
            <button className="h-14 px-8 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2">
              Start Free Trial <FiArrowRight />
            </button>
          </Link>
          <button className="h-14 px-8 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2">
            <FiPlayCircle className="text-xl" /> Watch Demo
          </button>
        </div>

        {/* CSS-Only Dashboard Mockup (Browser Window) */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
          <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="ml-4 bg-white border border-slate-200 px-3 py-1 rounded-md text-xs text-slate-400 flex-1 text-left max-w-sm">
              app.edunexus.com/dashboard
            </div>
          </div>
          <div className="p-2 bg-slate-50 grid grid-cols-4 gap-2 h-[400px]">
            {/* Sidebar Mock */}
            <div className="col-span-1 bg-white rounded-lg border border-slate-100 p-4 hidden md:block">
              <div className="h-8 w-24 bg-slate-100 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-indigo-50 rounded"></div>
                <div className="h-4 w-3/4 bg-slate-50 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
              </div>
            </div>
            {/* Main Content Mock */}
            <div className="col-span-3 bg-white rounded-lg border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-48 bg-slate-100 rounded"></div>
                <div className="h-8 w-8 bg-indigo-100 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-24 bg-slate-50 rounded border border-slate-100"></div>
                <div className="h-24 bg-slate-50 rounded border border-slate-100"></div>
                <div className="h-24 bg-slate-50 rounded border border-slate-100"></div>
              </div>
              <div className="h-48 bg-indigo-50/30 rounded border border-indigo-100 flex items-center justify-center text-indigo-300 font-bold text-2xl">
                Analytics & Real-time Data
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ----------------- SOCIAL PROOF ----------------- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by 5,000+ Modern Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Fake Logos using Text + Icons for demo */}
             <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><FaUniversity className="text-3xl"/> Stanford High</div>
             <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><FaSchool className="text-3xl"/> Greenwood Intl</div>
             <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><FaGraduationCap className="text-3xl"/> Tech Academy</div>
             <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><span className="text-3xl font-serif">Harbor</span> University</div>
          </div>
        </div>
      </section>

      {/* ----------------- FEATURES (BENTO GRID) ----------------- */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to run a <br/> world-class campus.
          </h2>
          <p className="text-lg text-slate-500">
            Replace your fragmented tools with one cohesive operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-indigo-100 transition-all group">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FiLayout />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Role-Based Portals</h3>
            <p className="text-slate-500 leading-relaxed">
              Dedicated dashboards for Students, Teachers, Admins, and Parents. Context-aware interfaces that just work.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-purple-100 transition-all group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FiUsers />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Live Classrooms</h3>
            <p className="text-slate-500 leading-relaxed">
              Integrated Zoom-like experience. Attendance is automated, and recordings are uploaded instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-orange-100 transition-all group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FiBarChart2 />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Analytics</h3>
            <p className="text-slate-500 leading-relaxed">
              Track student performance, revenue, and teacher efficiency with real-time data visualization.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- STATS ----------------- */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Built for scale.</h2>
            <p className="text-slate-400">Trusted by institutions of all sizes.</p>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="text-4xl font-extrabold text-indigo-400">10k+</div>
              <div className="text-sm text-slate-400 mt-1">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-400">99.9%</div>
              <div className="text-sm text-slate-400 mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-400">50+</div>
              <div className="text-sm text-slate-400 mt-1">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">E</div>
               <span className="text-xl font-bold text-slate-900">EduNexus.</span>
            </div>
            <p className="text-slate-500 text-sm">
              Making education management seamless for everyone, everywhere.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/features" className="hover:text-indigo-600">Features</a></li>
              <li><a href="/pricing" className="hover:text-indigo-600">Pricing</a></li>
              <li><a href="/updates" className="hover:text-indigo-600">Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/about" className="hover:text-indigo-600">About</a></li>
              <li><a href="/careers" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/privacy" className="hover:text-indigo-600">Privacy</a></li>
              <li><a href="/terms" className="hover:text-indigo-600">Terms</a></li>
              <li><a href="/security" className="hover:text-indigo-600">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2024 EduNexus Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Secure by <a href="https://www.optimawebdesign.in/" className="hover:text-indigo-600">optimawebdesign</a></span>
          </div>
        </div>
      </footer>

    </div>
  );
}