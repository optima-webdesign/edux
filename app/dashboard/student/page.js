"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiVideo, FiClock, FiBookOpen, FiActivity, FiAward, 
  FiCalendar, FiArrowRight, FiPlayCircle, FiCheckCircle, 
  FiTrendingUp, FiPlus, FiTrash2, FiX, FiBookmark, FiMoreHorizontal 
} from "react-icons/fi";

// --- MOCK DATA ---
const INITIAL_TASKS = [
  { id: 1, title: "React Hooks Quiz", date: "Today, 5:00 PM", urgent: true },
  { id: 2, title: "UI Design Submission", date: "Tomorrow, 11:59 PM", urgent: false },
];

const COURSES_DATA = [
  // In Progress
  { id: 1, title: "UI/UX Fundamentals", category: "progress", progress: 75, total: 12, completed: 9, last: "Color Theory", color: "bg-indigo-50 text-indigo-600" },
  { id: 2, title: "Backend with Node.js", category: "progress", progress: 30, total: 20, completed: 6, last: "Express Routing", color: "bg-purple-50 text-purple-600" },
  { id: 3, title: "Data Structures (Java)", category: "progress", progress: 10, total: 15, completed: 1, last: "Arrays Intro", color: "bg-blue-50 text-blue-600" },
  
  // Saved (For Later)
  { id: 4, title: "Machine Learning A-Z", category: "saved", progress: 0, total: 40, completed: 0, last: "Not Started", color: "bg-green-50 text-green-600" },
  { id: 5, title: "Figma Mastery 2024", category: "saved", progress: 0, total: 10, completed: 0, last: "Not Started", color: "bg-orange-50 text-orange-600" },
];

const ACTIVITY_DATA = {
  thisWeek: [40, 70, 35, 90, 60, 20, 80],
  lastWeek: [20, 45, 60, 30, 50, 80, 40]
};

export default function StudentDashboard() {
  // --- STATES ---
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentTime, setCurrentTime] = useState("");
  
  // Tab State
  const [activeTab, setActiveTab] = useState("progress");
  
  // Task States
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");
  
  // Activity Graph State
  const [graphView, setGraphView] = useState("thisWeek"); // 'thisWeek' | 'lastWeek'
  const [graphData, setGraphData] = useState(ACTIVITY_DATA.thisWeek);

  // --- 1. TIME LOGIC ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours();
      let greet = "Good Morning";
      if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
      else if (hrs >= 17) greet = "Good Evening";
      setGreeting(greet);
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. TASK LOGIC (ADD & DELETE) ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskInput,
      date: "Just Now",
      urgent: true // Default to urgent for demo
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskInput("");
    setTaskModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // --- 3. GRAPH LOGIC ---
  const toggleGraph = (view) => {
    setGraphView(view);
    setGraphData(view === 'thisWeek' ? ACTIVITY_DATA.thisWeek : ACTIVITY_DATA.lastWeek);
  };

  // --- 4. COURSE FILTER ---
  const filteredCourses = COURSES_DATA.filter(c => c.category === activeTab);

  return (
    <div className="space-y-8 font-sans text-slate-900 relative">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {greeting}, Arjun! 👋
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <FiCalendar className="text-indigo-500"/> 
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} 
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="font-mono font-medium text-slate-600">{currentTime}</span>
          </p>
        </div>
        <div className="flex gap-3">
             <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Weekly Goal</span>
                <span className="text-sm font-bold text-green-600">32 / 40 Hrs</span>
             </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Courses in Progress", value: "3", icon: <FiBookOpen />, color: "bg-blue-500", trend: "+1 this week" },
          { label: "Total Watch Time", value: "32h", icon: <FiClock />, color: "bg-orange-500", trend: "12% increase" },
          { label: "Avg. Quiz Score", value: "88%", icon: <FiAward />, color: "bg-green-500", trend: "Top 5% of class" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
               <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                  <p className="text-xs font-bold text-green-600 mt-2 flex items-center gap-1">
                     <FiTrendingUp /> {stat.trend}
                  </p>
               </div>
               <div className={`p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-${stat.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* LEFT COLUMN */}
         <div className="lg:col-span-8 space-y-8">
            
            {/* LIVE CLASS HERO */}
            <div className="relative bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span> Live Now
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold leading-tight mb-2">Advanced React Patterns</h2>
                        <p className="text-slate-300 text-sm flex items-center gap-4">
                           <span>👨‍🏫 Suresh Sir</span>
                           <span>👥 24 Watching</span>
                        </p>
                     </div>
                     
                     {/* 👇 FIXED LINK HERE: Absolute path with ID '1' */}
                     <Link href="/dashboard/student/live/1">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-900/50 transition-all flex items-center gap-2 mt-2">
                           <FiVideo size={20} /> Join Session
                        </button>
                     </Link>

                  </div>
                  <div className="hidden md:block w-48 h-32 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl relative group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Live" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur p-3 rounded-full text-white group-hover:bg-red-600 transition-colors">
                           <FiPlayCircle size={24} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* LEARNING TABS (WORKING) */}
            <div>
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">My Learning</h3>
                  <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-bold">
                     <button 
                        onClick={() => setActiveTab('progress')} 
                        className={`px-4 py-1.5 rounded-md transition-all ${activeTab === 'progress' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                        In Progress
                     </button>
                     <button 
                        onClick={() => setActiveTab('saved')} 
                        className={`px-4 py-1.5 rounded-md transition-all ${activeTab === 'saved' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                        Saved
                     </button>
                  </div>
               </div>

               <div className="space-y-4 min-h-[200px]">
                  {filteredCourses.length > 0 ? filteredCourses.map((course) => (
                     <div key={course.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 group animate-in fade-in slide-in-from-bottom-2">
                        {/* Icon */}
                        <div className={`w-14 h-14 ${course.color} rounded-xl flex items-center justify-center text-2xl font-bold shrink-0`}>
                           {course.title.charAt(0)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 w-full">
                           <div className="flex justify-between mb-2">
                              <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                              <span className="text-xs font-bold text-slate-400">{course.progress}%</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }}></div>
                           </div>
                           <p className="text-xs text-slate-400 mt-2">Next: <span className="text-slate-600 font-medium">{course.last}</span></p>
                        </div>

                        {/* Action */}
                        <Link href={`/dashboard/student/courses/${course.id}/play`}>
                            <button className="p-3 rounded-full border border-slate-200 text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                <FiPlayCircle size={20} />
                            </button>
                        </Link>
                     </div>
                  )) : (
                     <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <FiBookmark className="mx-auto mb-2 opacity-50" size={24}/>
                        <p>No courses found in this category.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* RIGHT COLUMN */}
         <div className="lg:col-span-4 space-y-8">
            
            {/* STUDY ACTIVITY GRAPH (WORKING) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FiActivity className="text-indigo-500"/> Activity
                   </h3>
                   {/* Dropdown for Graph */}
                   <select 
                      value={graphView}
                      onChange={(e) => toggleGraph(e.target.value)}
                      className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg p-2 cursor-pointer outline-none hover:bg-slate-100"
                   >
                      <option value="thisWeek">This Week</option>
                      <option value="lastWeek">Last Week</option>
                   </select>
               </div>
               
               <div className="flex items-end justify-between h-40 gap-2">
                  {graphData.map((height, i) => (
                     <div key={i} className="flex flex-col items-center gap-2 w-full group">
                        <div className="relative w-full bg-slate-100 rounded-t-lg overflow-hidden h-full flex items-end">
                           <div 
                              className={`w-full bg-indigo-500 rounded-t-lg transition-all duration-700 ease-out hover:bg-indigo-600 ${i === 3 ? 'bg-indigo-600' : 'opacity-70'}`} 
                              style={{ height: `${height}%` }}
                           ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                           {['M','T','W','T','F','S','S'][i]}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            {/* TASKS (WORKING ADD/DELETE) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Tasks</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">{tasks.length} Pending</span>
               </div>
               
               <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {tasks.length === 0 && (
                      <p className="text-center text-sm text-slate-400 py-4 italic">No tasks yet. Good job! 🎉</p>
                  )}
                  {tasks.map((task) => (
                     <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group relative">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${task.urgent ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{task.title}</h4>
                           <p className={`text-xs mt-1 ${task.urgent ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                              <FiClock className="inline mr-1"/> {task.date}
                           </p>
                        </div>
                        {/* Delete Button */}
                        <button 
                           onClick={() => handleDeleteTask(task.id)}
                           className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                        >
                           <FiTrash2 size={14} />
                        </button>
                     </div>
                  ))}
               </div>
               
               <button 
                  onClick={() => setTaskModalOpen(true)}
                  className="w-full mt-6 py-2 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center justify-center gap-2"
               >
                  <FiPlus /> Add Personal Task
               </button>
            </div>

         </div>
      </div>

      {/* --- ADD TASK MODAL --- */}
      {isTaskModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl m-4 animate-in zoom-in-95 duration-200">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">New Task</h3>
                  <button onClick={() => setTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <FiX size={24}/>
                  </button>
               </div>
               
               <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Task Name</label>
                     <input 
                        autoFocus
                        type="text" 
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        placeholder="e.g. Complete Assignment 2" 
                        className="w-full mt-2 p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium"
                     />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                     <button 
                        type="button" 
                        onClick={() => setTaskModalOpen(false)} 
                        className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        disabled={!newTaskInput.trim()}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
                     >
                        Add Task
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}

    </div>
  );
}