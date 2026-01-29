import Link from "next/link";
import {
  FiArrowRight,
  FiLayout,
  FiUsers,
  FiBarChart2,
  FiPlayCircle,
} from "react-icons/fi";
import { FaUniversity, FaSchool, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">

      {/* ----------------- NAVBAR ----------------- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              EduNexus.
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <Link href="/features" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="/solutions" className="hover:text-indigo-600 transition-colors">
              Solutions
            </Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="hover:text-indigo-600 transition-colors">
              Resources
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-slate-600 font-medium hover:text-indigo-600"
            >
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

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/50 blur-[100px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          v2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          Manage your institution <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            like a Fortune 500.
          </span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
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
      </main>

      {/* ----------------- SOCIAL PROOF ----------------- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by 5,000+ Modern Institutions
          </p>

          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-xl font-bold">
              <FaUniversity className="text-3xl" /> Stanford High
            </div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <FaSchool className="text-3xl" /> Greenwood Intl
            </div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <FaGraduationCap className="text-3xl" /> Tech Academy
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-white border-t border-slate-100 py-10 text-center text-sm text-slate-400">
        © 2024 EduNexus Inc. All rights reserved.
      </footer>

    </div>
  );
}
