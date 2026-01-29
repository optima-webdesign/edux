import Link from "next/link";
import { 
  FiArrowLeft, FiBriefcase, FiBook, FiTarget, FiTrendingUp, 
  FiCheck, FiX, FiMonitor, FiUsers 
} from "react-icons/fi";

const SOLUTIONS = [
  {
    id: "k12",
    title: "K-12 Schools",
    icon: FiBook,
    color: "bg-blue-100 text-blue-600",
    desc: "Digitize your entire school ecosystem. From attendance to report cards, bridge the gap between teachers and parents.",
    features: ["Parent Mobile App", "Bus Tracking Integration", "Digital Report Cards", "Automated Attendance"]
  },
  {
    id: "university",
    title: "Universities & Colleges",
    icon: FiMonitor,
    color: "bg-indigo-100 text-indigo-600",
    desc: "Manage thousands of students and complex curriculums. Facilitate research collaboration and campus placements.",
    features: ["Department Management", "Research Portals", "Placement Cell Tools", "Alumni Network"]
  },
  {
    id: "coaching",
    title: "Coaching Centers",
    icon: FiTarget,
    color: "bg-orange-100 text-orange-600",
    desc: "Scale your coaching business. Focus on teaching while we handle fees, marketing, and student progress tracking.",
    features: ["Fee Management", "Marketing CRM", "Lead Generation", "Live Test Series"]
  },
  {
    id: "corporate",
    title: "Corporate Training",
    icon: FiBriefcase,
    color: "bg-green-100 text-green-600",
    desc: "Upskill your workforce. Onboard new employees faster and track compliance training with detailed analytics.",
    features: ["Employee Onboarding", "Compliance Tracking", "Skill Assessment", "White-label Portal"]
  }
];

export default function SolutionsPage() {
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

      <main>
         {/* Hero */}
         <section className="py-20 px-6 text-center max-w-5xl mx-auto">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Tailored Solutions</span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-6 mb-8">
               Built for every <br/> <span className="text-indigo-600">Learning Environment.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
               Whether you are running a small tuition center or a global university, EduNexus adapts to your specific workflows.
            </p>
         </section>

         {/* Industry Grid */}
         <section className="px-6 max-w-7xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {SOLUTIONS.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all group">
                     <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>
                        <item.icon />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                     <p className="text-slate-500 mb-6 leading-relaxed">{item.desc}</p>
                     
                     <div className="space-y-3">
                        {item.features.map((feat, i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                                 <FiCheck size={12} />
                              </div>
                              <span className="text-sm font-bold text-slate-600">{feat}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Comparison (Old Way vs New Way) */}
         <section className="bg-slate-900 py-24 px-6 text-white">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-black mb-4">Why switch to EduNexus?</h2>
                  <p className="text-slate-400">Stop managing your institution with spreadsheets and WhatsApp.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Old Way */}
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">THE OLD WAY</div>
                     <h3 className="text-xl font-bold mb-6 text-slate-300">Manual Chaos</h3>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-slate-400">
                           <FiX className="text-red-500 shrink-0" /> Excel sheets crashing with data
                        </li>
                        <li className="flex items-center gap-3 text-slate-400">
                           <FiX className="text-red-500 shrink-0" /> Chasing parents for fees via phone
                        </li>
                        <li className="flex items-center gap-3 text-slate-400">
                           <FiX className="text-red-500 shrink-0" /> Zoom links lost in WhatsApp groups
                        </li>
                        <li className="flex items-center gap-3 text-slate-400">
                           <FiX className="text-red-500 shrink-0" /> Manual grading takes weekends away
                        </li>
                     </ul>
                  </div>

                  {/* New Way */}
                  <div className="bg-indigo-600 border border-indigo-500 p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-indigo-900/50">
                     <div className="absolute top-0 right-0 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-bl-xl">THE EDUNEXUS WAY</div>
                     <h3 className="text-xl font-bold mb-6 text-white">Automated Zen</h3>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-indigo-100 font-bold">
                           <FiCheck className="text-white shrink-0" /> Centralized Database (Cloud)
                        </li>
                        <li className="flex items-center gap-3 text-indigo-100 font-bold">
                           <FiCheck className="text-white shrink-0" /> Automated Fee Reminders & Gateway
                        </li>
                        <li className="flex items-center gap-3 text-indigo-100 font-bold">
                           <FiCheck className="text-white shrink-0" /> One-click Live Class Join
                        </li>
                        <li className="flex items-center gap-3 text-indigo-100 font-bold">
                           <FiCheck className="text-white shrink-0" /> AI Grading & Performance Analytics
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="py-20 px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Find the perfect fit for your organization</h2>
            <Link href="/contact">
               <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2 mx-auto">
                  <FiUsers /> Consult our Solutions Team
               </button>
            </Link>
         </section>

      </main>

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