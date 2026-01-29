import Link from "next/link";
import { FiArrowLeft, FiTag, FiCalendar, FiCheck, FiZap, FiTool } from "react-icons/fi";

const UPDATES = [
  {
    version: "v2.1.0",
    date: "October 24, 2025",
    type: "Feature",
    title: "Parent Portal Launched",
    description: "Parents can now log in to track their child's attendance, pay fees, and view detailed performance reports.",
    changes: [
      "Added Parent Login role.",
      "Integrated Fee Payment Gateway (Mock).",
      "Subject-wise Performance Charts.",
      "Real-time Attendance Alerts."
    ]
  },
  {
    version: "v2.0.5",
    date: "October 10, 2025",
    type: "Improvement",
    title: "Live Class Experience Upgrade",
    description: "We've overhauled the video conferencing interface for better stability and added new interactive tools for teachers.",
    changes: [
      "Zoom-style Grid View added.",
      "Whiteboard latency reduced by 40%.",
      "Added 'Raise Hand' feature for students."
    ]
  },
  {
    version: "v1.9.2",
    date: "September 28, 2025",
    type: "Fix",
    title: "Bug Fixes & Performance",
    description: "Squashed some pesky bugs and improved load times across the dashboard.",
    changes: [
      "Fixed login timeout issue on mobile devices.",
      "Resolved 404 error on certain assignment uploads.",
      "Optimized images for faster dashboard loading."
    ]
  },
  {
    version: "v1.0.0",
    date: "August 15, 2025",
    type: "Release",
    title: "EduNexus Global Launch",
    description: "The first public release of the EduNexus Learning Management System.",
    changes: [
      "Student, Teacher, and Admin portals.",
      "Course Management System.",
      "Basic Analytics Dashboard."
    ]
  }
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-white">
       {/* Navbar */}
       <nav className="border-b border-slate-100 p-6 max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div></Link>
        <Link href="/login">
            <button className="text-sm font-bold text-slate-600 hover:text-indigo-600">Login to Dashboard</button>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
         <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">What's New</span>
            <h1 className="text-4xl font-black text-slate-900 mt-4 mb-2">Product Updates</h1>
            <p className="text-slate-500">New features, improvements, and fixes.</p>
         </div>

         <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {UPDATES.map((update, index) => (
               <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  
                  {/* Icon Badge */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     {update.type === 'Feature' && <FiZap className="text-yellow-500" />}
                     {update.type === 'Improvement' && <FiTag className="text-blue-500" />}
                     {update.type === 'Fix' && <FiTool className="text-slate-500" />}
                     {update.type === 'Release' && <FiCheck className="text-green-500" />}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                           update.type === 'Feature' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                           update.type === 'Improvement' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                           update.type === 'Fix' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                           'bg-green-50 text-green-700 border-green-200'
                        }`}>
                           {update.type}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                           <FiCalendar /> {update.date}
                        </span>
                     </div>
                     
                     <h3 className="font-bold text-slate-900 text-lg mb-1">{update.title}</h3>
                     <p className="text-slate-500 text-sm leading-relaxed mb-4">{update.description}</p>
                     
                     <ul className="space-y-2">
                        {update.changes.map((change, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                              {change}
                           </li>
                        ))}
                     </ul>
                     <p className="text-xs font-mono text-slate-300 mt-4 text-right">{update.version}</p>
                  </div>
               </div>
            ))}
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