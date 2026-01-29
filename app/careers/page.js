import Link from "next/link";
import { FiArrowLeft, FiBriefcase, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

const JOBS = [
  { id: 1, title: "Senior React Developer", department: "Engineering", type: "Full-time", location: "Remote" },
  { id: 2, title: "Product Designer (UI/UX)", department: "Design", type: "Full-time", location: "Bangalore" },
  { id: 3, title: "Curriculum Manager", department: "Education", type: "Contract", location: "Mumbai" },
  { id: 4, title: "Sales Executive", department: "Marketing", type: "Full-time", location: "Delhi" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Navbar (Simplified) */}
      <nav className="border-b border-slate-100 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600">EduNexus.</div></Link>
        <Link href="/contact"><button className="font-bold text-slate-600 hover:text-indigo-600">Contact HR</button></Link>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
         <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">We are hiring</span>
         <h1 className="text-5xl font-black text-slate-900 mt-4 mb-6">
            Join the Education <br/> <span className="text-indigo-600">Revolution.</span>
         </h1>
         <p className="text-xl text-slate-500 mb-10">
            We are looking for passionate individuals who want to change how the world learns. 
            Do you have what it takes?
         </p>
      </section>

      {/* Job Listings */}
      <section className="bg-slate-50 py-20 px-6">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Open Positions</h2>
            
            <div className="grid gap-4">
               {JOBS.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-center group cursor-pointer">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <div className="flex gap-4 mt-2 text-sm font-bold text-slate-400">
                           <span className="flex items-center gap-1"><FiBriefcase /> {job.department}</span>
                           <span className="flex items-center gap-1"><FiClock /> {job.type}</span>
                           <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                        </div>
                     </div>
                     <div className="mt-4 md:mt-0">
                        <button className="px-6 py-2 rounded-full border border-slate-200 font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                           Apply Now
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-12 text-center">
               <p className="text-slate-500 font-medium">Don&apos;t see a role for you?</p>
               <Link href="/contact" className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-1 mt-1">
                  Send us your resume anyway <FiArrowRight />
               </Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 text-center bg-white">
         <p className="text-slate-400 text-sm font-bold">© 2025 EduNexus Inc.</p>
         <Link href="/">
            <button className="mt-4 text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
               <FiArrowLeft /> Back to Home
            </button>
         </Link>
      </footer>
    </div>
  );
}