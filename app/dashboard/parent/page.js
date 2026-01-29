"use client";
import { DASHBOARD_STATS } from "@/lib/data";
import StatsCard from "@/components/StatsCard";
import { 
  FiDownload, FiCheckCircle, FiClock, FiList, 
  FiCalendar, FiMessageCircle, FiBell, FiFileText, FiPhone 
} from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-hot-toast"; // ✅ Interaction ke liye

export default function ParentDashboard() {
  const stats = DASHBOARD_STATS.parent;

  // --- Mock Actions ---
  const handleDownloadReport = () => toast.success("Report Card Downloaded! 📄");
  const handleContactTeacher = () => toast.success("Request sent to Suresh Sir! 📞");
  const handleConfirmPTM = () => toast.success("Attendance Confirmed for PTM! ✅");
  const handleViewTimetable = () => toast("Opening Class Timetable... 📅", { icon: "⏳" });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-indigo-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10">
           <FiCheckCircle size={250} />
        </div>
        <div className="relative z-10">
           <div className="flex items-center gap-4 mb-4">
              <span className="bg-indigo-500/30 text-indigo-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-400/30">
                 Academic Year 2025-26
              </span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold">Child Report: Rahul Kumar</h1>
           <p className="text-indigo-200 mt-2 text-lg">Class 10-A • Roll No: CS-01 • Optima High School</p>
           
           <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={handleDownloadReport}
                className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg active:scale-95"
              >
                 <FiDownload /> Download Report Card
              </button>
              <button 
                onClick={handleContactTeacher}
                className="bg-indigo-700/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 border border-indigo-500/50 backdrop-blur-sm transition-all flex items-center gap-2 active:scale-95"
              >
                 <FiPhone /> Contact Class Teacher
              </button>
           </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* LEFT COLUMN: Attendance & Results */}
         <div className="space-y-6">
            
            {/* Recent Attendance */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                     <FiClock className="text-indigo-600"/> Recent Attendance
                  </h3>
                  <Link href="/dashboard/parent/performance" className="text-indigo-600 text-sm font-bold hover:underline">
                    View Full Calendar
                  </Link>
               </div>
               <div className="space-y-3">
                  {[
                     { date: "Oct 24, 2025", status: "Present", color: "bg-green-100 text-green-700" },
                     { date: "Oct 23, 2025", status: "Present", color: "bg-green-100 text-green-700" },
                     { date: "Oct 22, 2025", status: "Absent", color: "bg-red-100 text-red-700" },
                  ].map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700 text-sm">
                           {item.date}
                        </span>
                        <span className={`${item.color} px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter`}>
                           {item.status}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                     <FiList className="text-indigo-600"/> Recent Test Results
                  </h3>
                  {/* ✅ Link to Performance Page */}
                  <Link href="/dashboard/parent/performance" className="text-indigo-600 text-sm font-bold hover:underline">
                    View All Results
                  </Link>
               </div>
               <div className="space-y-3">
                  {[
                     { subject: "Mathematics", marks: "45/50", grade: "A+" },
                     { subject: "Physics", marks: "38/50", grade: "B+" },
                     { subject: "English", marks: "42/50", grade: "A" },
                  ].map((test, idx) => (
                     <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                           <p className="font-bold text-slate-900 text-sm">{test.subject}</p>
                           <p className="text-xs text-slate-500 font-bold">Unit Test 2</p>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-slate-900">{test.marks}</p>
                           <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{test.grade}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* RIGHT COLUMN: Notes, PTM & Info */}
         <div className="space-y-6">
           
            {/* Teacher's Note */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 relative">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                     <FiMessageCircle size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-900 text-lg mb-2">Teacher's Note</h3>
                     <p className="text-slate-700 leading-relaxed font-medium text-sm">
                        "Rahul is participating actively in class discussions. Please ensure he completes his Physics practical file by next Monday."
                     </p>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-3">
                        - Suresh Sir (Class Teacher)
                     </p>
                  </div>
               </div>
            </div>

            {/* Parent-Teacher Meeting (PTM) & Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* PTM Card */}
               <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-orange-700">
                        <FiCalendar size={24} />
                        <h3 className="font-bold text-lg">Next PTM</h3>
                    </div>
                    <p className="text-slate-900 font-black text-2xl">15 Nov</p>
                    <p className="text-slate-500 text-sm font-bold">Saturday, 10:00 AM</p>
                  </div>
                  <button 
                    onClick={handleConfirmPTM}
                    className="mt-4 w-full bg-orange-200 text-orange-800 py-2 rounded-lg text-sm font-bold hover:bg-orange-300 transition-colors"
                  >
                     Confirm Attendance
                  </button>
               </div>

               {/* Announcements Card */}
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4 text-blue-700">
                     <FiBell size={24} />
                     <h3 className="font-bold text-lg">Notices</h3>
                  </div>
                  <ul className="space-y-3">
                     <li className="text-sm text-slate-700 font-medium list-disc ml-4">School closed on 2nd Oct.</li>
                     <li className="text-sm text-slate-700 font-medium list-disc ml-4">Science Exhibition open.</li>
                     <li className="text-sm text-slate-700 font-medium list-disc ml-4">Winter uniform from Nov 1.</li>
                  </ul>
               </div>
            </div>

            {/* Timetable Link */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all cursor-pointer group" onClick={handleViewTimetable}>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <FiFileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">Class Timetable</h3>
                    <p className="text-slate-500 text-sm">View daily class schedule</p>
                  </div>
               </div>
               <button className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold text-sm group-hover:bg-indigo-600 transition-colors">
                  View PDF
               </button>
            </div>

         </div>

      </div>
    </div>
  );
}