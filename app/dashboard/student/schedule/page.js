"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  FiVideo, FiClock, FiCalendar, FiDownload, FiAlertCircle, 
  FiChevronRight, FiFilter, FiBell, FiCheck, FiRefreshCw 
} from "react-icons/fi";

// --- MOCK DATA (Day-wise) ---
const SCHEDULE_DATA = {
  Mon: [
    { id: 101, time: "09:00 AM", subject: "React Fundamentals", type: "Live Class", instructor: "Suresh Sir", status: "Completed", duration: "90 min" },
    { id: 102, time: "11:30 AM", subject: "JavaScript ES6+", type: "Workshop", instructor: "Anita Mam", status: "Completed", duration: "120 min" },
  ],
  Tue: [
    { id: 201, time: "10:00 AM", subject: "CSS Grid & Flexbox", type: "Live Class", instructor: "Rahul Verma", status: "Completed", duration: "60 min" },
    { id: 202, time: "02:00 PM", subject: "UI Design Principles", type: "Recorded", instructor: "Design Team", status: "Available", duration: "45 min" },
  ],
  Wed: [ // Today
    { id: 301, time: "09:00 AM", subject: "Advanced Hooks", type: "Live Class", instructor: "Suresh Sir", status: "Completed", duration: "90 min" },
    { id: 302, time: "11:00 AM", subject: "System Design Basics", type: "Live Class", instructor: "Vikram Roy", status: "Live", duration: "90 min", progress: 45 }, // 45% done
    { id: 303, time: "02:00 PM", subject: "Algorithm Practice", type: "Self Paced", instructor: "-", status: "Upcoming", duration: "120 min" },
    { id: 304, time: "04:00 PM", subject: "Doubt Session", type: "Live Class", instructor: "Suresh Sir", status: "Upcoming", duration: "60 min" },
  ],
  Thu: [
    { id: 401, time: "10:00 AM", subject: "Backend Integration", type: "Live Class", instructor: "Suresh Sir", status: "Upcoming", duration: "90 min" },
  ],
  Fri: [
    { id: 501, time: "03:00 PM", subject: "Weekly Quiz", type: "Assessment", instructor: "Auto", status: "Scheduled", duration: "30 min" },
  ],
  Sat: [],
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("Wed");
  const [filterType, setFilterType] = useState("All"); // All, Live Class, Workshop, Assessment
  const [reminders, setReminders] = useState({}); // Stores IDs of reminded classes
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // --- LOGIC: Generate Real Dates for the Week ---
  const weekDays = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    // Assuming 'Wed' is today for mock purposes, usually you'd calculate start of week
    // Here we just map simple mock dates for display
    const currentDayIndex = days.indexOf("Wed"); 
    
    return days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (currentDayIndex - index));
      return {
        name: day,
        date: date.getDate(),
        fullDate: date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })
      };
    });
  }, []);

  // --- LOGIC: Filter Classes ---
  const filteredSchedule = (SCHEDULE_DATA[activeDay] || []).filter(item => {
    if (filterType === "All") return true;
    return item.type === filterType;
  });

  // --- ACTIONS ---
  const toggleReminder = (id) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
    if (!reminders[id]) alert("Reminder set for this class! 🔔");
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Calendar Synced Successfully! 📅");
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate download
      const link = document.createElement("a");
      link.href = "#";
      link.download = "Schedule.pdf";
      // alert("Schedule PDF Downloaded!");
    }, 1500);
  };

  // Get current active day object
  const currentDayObj = weekDays.find(d => d.name === activeDay);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans text-slate-900 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Weekly Schedule</h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <FiCalendar className="text-indigo-500"/> 
            {currentDayObj?.fullDate || "Today"}
          </p>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm disabled:opacity-70 disabled:cursor-wait"
            >
                {isDownloading ? "Downloading..." : <><FiDownload /> PDF</>}
            </button>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-all text-sm disabled:opacity-70 disabled:cursor-wait"
            >
                {isSyncing ? <><FiRefreshCw className="animate-spin"/> Syncing...</> : <><FiRefreshCw /> Sync Calendar</>}
            </button>
        </div>
      </div>

      {/* --- DAY SELECTOR & FILTER --- */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
         
         {/* Days Row */}
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {weekDays.map((dayObj) => (
              <button 
                key={dayObj.name}
                onClick={() => setActiveDay(dayObj.name)}
                className={`flex-1 min-w-[90px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                  dayObj.name === activeDay 
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105" 
                    : "bg-transparent text-slate-500 border-transparent hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">{dayObj.name}</span>
                <span className="text-xl font-extrabold">{dayObj.date}</span>
                {SCHEDULE_DATA[dayObj.name]?.some(i => i.status === 'Live') && (
                   <span className="mt-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
         </div>

         {/* Filter Row */}
         <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mr-2">
               <FiFilter /> Filter:
            </span>
            {["All", "Live Class", "Workshop", "Assessment"].map(type => (
               <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                     filterType === type 
                     ? "bg-indigo-100 text-indigo-700" 
                     : "text-slate-500 hover:bg-slate-50"
                  }`}
               >
                  {type}
               </button>
            ))}
         </div>
      </div>

      {/* --- TIMELINE CONTENT --- */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm min-h-[400px] relative">
        
        {/* List Header */}
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
                {activeDay === "Wed" && <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>}
                {filteredSchedule.length > 0 ? "Scheduled Sessions" : "Free Day"}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                {filteredSchedule.length} Events
            </span>
        </div>
        
        {/* --- SCHEDULE LIST --- */}
        {filteredSchedule.length > 0 ? (
            <div className="space-y-0 relative">
                {/* Vertical Connector Line */}
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-100 hidden md:block"></div>

                {filteredSchedule.map((item) => (
                    <div key={item.id} className="relative pl-0 md:pl-16 py-4 group animate-in slide-in-from-bottom-2">
                    
                        {/* Status Icon (Timeline Dot) */}
                        <div className={`absolute left-[14px] top-10 w-5 h-5 rounded-full border-4 border-white ring-2 hidden md:flex items-center justify-center z-10 ${
                            item.status === 'Live' ? 'bg-red-500 ring-red-100 animate-pulse' : 
                            item.status === 'Completed' ? 'bg-slate-300 ring-slate-100' : 'bg-indigo-600 ring-indigo-100'
                        }`}></div>
                        
                        {/* Main Card */}
                        <div className={`border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg ${
                            item.status === 'Live' 
                                ? 'bg-gradient-to-r from-white to-red-50/50 border-red-200 shadow-red-100/50 shadow-md ring-1 ring-red-500/10' 
                                : item.status === 'Completed' 
                                ? 'bg-slate-50 border-slate-200 opacity-75 hover:opacity-100' 
                                : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}>
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                
                                {/* Left: Time & Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-1.5 text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-lg text-sm">
                                            <FiClock className="text-slate-500"/> {item.time}
                                        </div>
                                        {item.status === 'Live' && (
                                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                                                ● LIVE NOW
                                            </span>
                                        )}
                                        <span className="text-xs font-medium text-slate-400">{item.duration}</span>
                                    </div>
                                    
                                    <h4 className={`text-xl font-bold mb-1 ${item.status === 'Completed' ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800'}`}>{item.subject}</h4>
                                    
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-2">
                                        <span className={`flex items-center gap-1 font-medium ${item.type === 'Live Class' ? 'text-indigo-600' : 'text-orange-600'}`}>
                                           <FiAlertCircle size={14}/> {item.type}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span>Inst: {item.instructor}</span>
                                    </div>

                                    {/* Live Progress Bar */}
                                    {item.status === 'Live' && (
                                       <div className="mt-4 w-full max-w-xs bg-red-100 h-1.5 rounded-full overflow-hidden">
                                          <div className="bg-red-500 h-full" style={{ width: `${item.progress}%` }}></div>
                                       </div>
                                    )}
                                </div>

                                {/* Right: Action Button */}
                                <div className="flex items-center justify-start md:justify-end gap-3">
                                    {item.status === 'Live' ? (
                                        <Link href="/dashboard/student/live/1">
                                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-200 transition-all flex items-center gap-2 transform hover:scale-105">
                                                <FiVideo size={18} /> Join Now
                                            </button>
                                        </Link>
                                    ) : item.status === 'Upcoming' ? (
                                        <>
                                            <button 
                                                onClick={() => toggleReminder(item.id)}
                                                className={`p-3 rounded-xl border transition-all ${
                                                    reminders[item.id] 
                                                    ? "bg-indigo-50 border-indigo-200 text-indigo-600" 
                                                    : "bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200"
                                                }`}
                                                title="Set Reminder"
                                            >
                                                {reminders[item.id] ? <FiCheck size={18} /> : <FiBell size={18} />}
                                            </button>
                                            <button disabled className="bg-slate-100 text-slate-400 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 cursor-not-allowed">
                                                Starts Soon
                                            </button>
                                        </>
                                    ) : (
                                        <button className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 px-5 py-2.5 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                            Watch Recording <FiChevronRight />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            // --- EMPTY STATE UI ---
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                    <FiCalendar className="text-4xl text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No classes scheduled</h3>
                <p className="text-slate-500 mt-2 max-w-sm">
                    Looks like a free day! Use this time to complete assignments or review previous lectures.
                </p>
                <button 
                    onClick={() => setFilterType("All")}
                    className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                    Clear Filters
                </button>
            </div>
        )}

      </div>
    </div>
  );
}