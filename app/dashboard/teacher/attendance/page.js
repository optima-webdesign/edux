"use client";
import { useState } from "react";
import { CLASS_LIST } from "@/lib/data";
import { FiCheck, FiX, FiClock, FiSave, FiCalendar, FiUsers } from "react-icons/fi";

export default function AttendancePage() {
  const [students, setStudents] = useState(CLASS_LIST);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSaved, setIsSaved] = useState(false);

  // Status Toggle Logic
  const handleStatus = (id, status) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setIsSaved(false);
  };

  const saveAttendance = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Reset after 3 seconds
  };

  // Stats Calculation
  const presentCount = students.filter(s => s.status === "Present").length;
  const absentCount = students.filter(s => s.status === "Absent").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daily Attendance</h1>
          <p className="text-slate-500 mt-2">Class 10-A • Computer Science</p>
        </div>
        
        {/* Date Picker */}
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
           <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
             <FiCalendar />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase">Select Date</p>
             <input 
               type="date" 
               value={date}
               onChange={(e) => setDate(e.target.value)}
               className="bg-transparent outline-none font-bold text-slate-700 text-sm"
             />
           </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
         <div className="bg-green-50 border border-green-100 p-5 rounded-2xl text-center">
            <h3 className="text-3xl font-black text-green-600">{presentCount}</h3>
            <p className="text-xs font-bold text-green-700/60 uppercase tracking-widest mt-1">Present</p>
         </div>
         <div className="bg-red-50 border border-red-100 p-5 rounded-2xl text-center">
            <h3 className="text-3xl font-black text-red-600">{absentCount}</h3>
            <p className="text-xs font-bold text-red-700/60 uppercase tracking-widest mt-1">Absent</p>
         </div>
         <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center">
            <h3 className="text-3xl font-black text-slate-600">{students.length}</h3>
            <p className="text-xs font-bold text-slate-500/60 uppercase tracking-widest mt-1">Total</p>
         </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <FiUsers /> Student List
          </h3>
          <span className="text-xs font-bold text-slate-400 uppercase bg-slate-200 px-2 py-1 rounded">Batch 2025</span>
        </div>

        <div className="divide-y divide-slate-100">
            {students.map((student) => (
              <div key={student.id} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                
                {/* Student Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <img src={student.avatar} className="w-12 h-12 rounded-full border-2 border-slate-100 object-cover" alt="" />
                   <div>
                      <p className="font-bold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded w-fit">{student.roll}</p>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full md:w-auto">
                   {['Present', 'Absent', 'Late'].map((status) => {
                      const isActive = student.status === status;
                      let colorClass = "border-slate-200 text-slate-400 hover:border-slate-300";
                      
                      if (isActive && status === 'Present') colorClass = "bg-green-600 text-white border-green-600 shadow-md shadow-green-200";
                      if (isActive && status === 'Absent') colorClass = "bg-red-500 text-white border-red-500 shadow-md shadow-red-200";
                      if (isActive && status === 'Late') colorClass = "bg-orange-400 text-white border-orange-400 shadow-md shadow-orange-200";

                      return (
                        <button 
                          key={status}
                          onClick={() => handleStatus(student.id, status)}
                          className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-bold text-sm border transition-all active:scale-95 flex items-center justify-center gap-2 ${colorClass}`}
                        >
                           {status === 'Present' && <FiCheck />}
                           {status === 'Absent' && <FiX />}
                           {status === 'Late' && <FiClock />}
                           <span className="hidden md:inline">{status}</span>
                        </button>
                      );
                   })}
                </div>
              </div>
            ))}
        </div>
        
        {/* Footer Save Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end sticky bottom-0">
           <button 
             onClick={saveAttendance}
             className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform ${
                isSaved ? "bg-green-600 scale-95" : "bg-slate-900 hover:bg-indigo-600"
             }`}
           >
              {isSaved ? <><FiCheck /> Saved Successfully</> : <><FiSave /> Save Attendance Report</>}
           </button>
        </div>
      </div>
    </div>
  );
}