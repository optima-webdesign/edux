"use client";
import { useState } from "react";
import { 
  FiTrendingUp, FiAward, FiBookOpen, FiDownload, 
  FiCalendar, FiActivity, FiTarget 
} from "react-icons/fi";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

// 🇮🇳 Mock Data: Student Performance
const SUBJECT_DATA = [
  { subject: "Maths", A: 92, fullMark: 100 },
  { subject: "Physics", A: 78, fullMark: 100 },
  { subject: "Chemistry", A: 85, fullMark: 100 },
  { subject: "English", A: 88, fullMark: 100 },
  { subject: "Comp Sci", A: 95, fullMark: 100 },
  { subject: "History", A: 70, fullMark: 100 },
];

const EXAM_HISTORY = [
  { name: "Unit Test 1", score: 82 },
  { name: "Mid-Term", score: 84 },
  { name: "Unit Test 2", score: 86 },
  { name: "Half Yearly", score: 88 },
];

const RECENT_EXAMS = [
  { id: 1, name: "Half Yearly Exam", date: "15 Dec 2025", result: "Pass", percentage: "88%", rank: "4th" },
  { id: 2, name: "Unit Test 2", date: "10 Oct 2025", result: "Pass", percentage: "86%", rank: "6th" },
  { id: 3, name: "Mid-Term Exam", date: "24 Aug 2025", result: "Pass", percentage: "84%", rank: "8th" },
];

export default function ParentPerformance() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Report Download Logic (Mock)
  const downloadReportCard = () => {
    alert("Downloading Rahul's Report Card... 📄");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Academic Progress 📊</h1>
          <p className="text-slate-500 mt-2">Detailed analysis of Rahul's performance in Class X-A.</p>
        </div>
        <button 
          onClick={downloadReportCard}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <FiDownload /> Download Report Card
        </button>
      </div>

      {/* Top Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* CGPA Card */}
         <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-indigo-100 font-bold text-xs uppercase tracking-wider">Current CGPA</p>
                     <h3 className="text-4xl font-extrabold mt-1">8.8</h3>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><FiTrendingUp size={24}/></div>
               </div>
               <p className="text-sm mt-4 bg-white/10 w-fit px-3 py-1 rounded-full font-medium">+0.2 vs last term</p>
            </div>
            {/* Decorative Circle */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
         </div>

         {/* Best Subject */}
         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-center">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <FiAward size={24} />
               </div>
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase">Strongest Subject</p>
                  <h3 className="text-xl font-bold text-slate-900">Computer Science</h3>
                  <p className="text-green-600 text-sm font-bold">95/100 (O Grade)</p>
               </div>
            </div>
         </div>

         {/* Improvement Area */}
         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-center">
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <FiTarget size={24} />
               </div>
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase">Focus Area</p>
                  <h3 className="text-xl font-bold text-slate-900">History</h3>
                  <p className="text-orange-600 text-sm font-bold">70/100 (Needs Attention)</p>
               </div>
            </div>
         </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* 1. Radar Chart (Subject Strength) */}
         <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
               <FiActivity className="text-indigo-600" /> Skill Analysis
            </h3>
            <p className="text-slate-500 text-sm mb-6">Visual representation of subject proficiency.</p>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SUBJECT_DATA}>
                     <PolarGrid stroke="#e2e8f0" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                     <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                     <Radar
                        name="Rahul"
                        dataKey="A"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fill="#4f46e5"
                        fillOpacity={0.4}
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* 2. Performance Trend (Line/Area Chart) */}
         <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
               <FiTrendingUp className="text-green-600" /> Growth Trajectory
            </h3>
            <p className="text-slate-500 text-sm mb-6">Percentage improvement over the academic year.</p>

            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={EXAM_HISTORY}>
                     <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                     <YAxis hide domain={[60, 100]} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Exam History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">Exam History</h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Academic Year 2025-26</span>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="p-4 text-xs font-bold text-slate-500 uppercase">Exam Name</th>
                     <th className="p-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                     <th className="p-4 text-xs font-bold text-slate-500 uppercase">Class Rank</th>
                     <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Result</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {RECENT_EXAMS.map((exam) => (
                     <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                           <FiBookOpen className="text-slate-400" /> {exam.name}
                        </td>
                        <td className="p-4 text-sm text-slate-500 font-bold">{exam.date}</td>
                        <td className="p-4 text-sm font-bold text-indigo-600">{exam.rank}</td>
                        <td className="p-4 text-right">
                           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold border border-green-200">
                              {exam.percentage} • {exam.result}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
            <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center justify-center gap-1 mx-auto">
               View All Exams <FiTrendingUp />
            </button>
         </div>
      </div>
    </div>
  );
}