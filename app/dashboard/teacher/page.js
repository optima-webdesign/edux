"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FiUsers, FiBook, FiActivity, FiPlus, FiVideo, 
  FiCheckSquare, FiClock, FiMoreVertical, FiTrendingUp,
  FiDollarSign, FiStar, FiDownload, FiUpload, FiX, FiFileText, FiSend, FiTrash2, FiEdit3
} from "react-icons/fi";

// --- MOCK DATA ---
const INITIAL_STATS = [
  { id: 1, label: "Total Students", value: "1,240", icon: <FiUsers />, color: "bg-blue-600", trend: "+12%" },
  { id: 2, label: "Total Revenue", value: "₹4.2L", icon: <FiDollarSign />, color: "bg-green-600", trend: "+8.5%" },
  { id: 3, label: "Course Rating", value: "4.8", icon: <FiStar />, color: "bg-yellow-500", trend: "Top 5%" },
];

const INITIAL_SUBMISSIONS = [
  { id: 1, student: "Rahul Verma", assignment: "React Hooks Project", status: "Pending", time: "10 mins ago", avatar: "R", fileUrl: "hooks_project.zip" },
  { id: 2, student: "Sneha Gupta", assignment: "UI Design System", status: "Pending", time: "1 hour ago", avatar: "S", fileUrl: "design_system.fig" },
  { id: 3, student: "Amit Kumar", assignment: "Node.js API", status: "Graded", time: "Yesterday", avatar: "A", fileUrl: "api_docs.pdf" },
];

const INITIAL_COURSES = [
  { id: 1, name: "Complete React Guide", status: "Published", sales: 450, rating: 4.8, earnings: "₹1,80,000" },
  { id: 2, name: "Advanced Node.js", status: "Draft", sales: 0, rating: "-", earnings: "₹0" },
];

export default function TeacherDashboard() {
  // --- STATES ---
  const [stats, setStats] = useState(INITIAL_STATS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  
  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'analytics', 'createCourse', 'viewFile', 'announcement'
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null); // For notifications

  // Form States
  const [newCourseName, setNewCourseName] = useState("");
  const [announcementText, setAnnouncementText] = useState("");

  // --- ACTIONS ---

  // Show Notification Toast
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 1. GRADE ASSIGNMENT
  const handleGrade = (id) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: "Graded" } : sub
    ));
    showToast("Assignment Graded Successfully! ✅");
  };

  // 2. CREATE COURSE
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const newCourse = {
        id: Date.now(),
        name: newCourseName,
        status: "Draft",
        sales: 0,
        rating: "-",
        earnings: "₹0"
      };
      setCourses([...courses, newCourse]);
      setNewCourseName("");
      setIsProcessing(false);
      setActiveModal(null);
      showToast(`Course "${newCourseName}" Created! 🎉`);
    }, 1500);
  };

  // 3. DELETE COURSE
  const handleDeleteCourse = (id) => {
    if(confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
      showToast("Course Deleted 🗑️", "error");
    }
  };

  // 4. DOWNLOAD ATTENDANCE
  const handleDownloadAttendance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Fake Download Logic
      const element = document.createElement("a");
      const file = new Blob(["Student, Date, Status\nRahul, 2024-01-01, Present"], {type: 'text/csv'});
      element.href = URL.createObjectURL(file);
      element.download = "Attendance_Report.csv";
      document.body.appendChild(element);
      element.click();
      showToast("Attendance Report Downloaded 📥");
    }, 2000);
  };

  // 5. UPLOAD NOTES
  const handleUploadNotes = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          showToast(`"${file.name}" Uploaded Successfully! 📤`);
        }, 2000);
      }
    };
    input.click();
  };

  // 6. SEND ANNOUNCEMENT
  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setActiveModal(null);
        setAnnouncementText("");
        showToast("Announcement Sent to All Students! 📢");
    }, 1500);
  };

  // 7. VIEW SUBMISSION FILE
  const openFileViewer = (sub) => {
    setSelectedFile(sub);
    setActiveModal('viewFile');
  };

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-20 relative">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl text-white font-bold animate-in slide-in-from-top-5 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
           {toast.msg}
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Instructor Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back! You have <span className="font-bold text-indigo-600">{submissions.filter(s => s.status === 'Pending').length} pending</span> tasks.</p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={() => setActiveModal('analytics')}
             className="bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
           >
              <FiActivity /> Analytics
           </button>
           <button 
             onClick={() => setActiveModal('createCourse')}
             className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
           >
              <FiPlus /> Create New Course
           </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
               </div>
               <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
               <FiTrendingUp /> {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COL */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* LIVE CLASS MANAGER */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     <FiVideo className="text-red-500"/> Live Class Manager
                  </h3>
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">Today's Schedule</span>
               </div>

               <div className="flex flex-col md:flex-row items-center justify-between p-4 border border-red-200 bg-red-50/20 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                     <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-red-100 text-red-600 animate-pulse">
                        <FiVideo />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-900">Advanced React Patterns</h4>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                           <FiClock /> 10:00 AM - 11:30 AM • 24 Enrolled
                        </p>
                     </div>
                  </div>
                  <Link href="/dashboard/student/live/1" className="w-full md:w-auto">
                        <button className="w-full md:w-auto px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 animate-bounce-slow">
                           Go Live Now
                        </button>
                  </Link>
               </div>
            </div>

            {/* COURSE TABLE */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Active Courses</h3>
                  <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                           <th className="pb-3 pl-2">Course Name</th>
                           <th className="pb-3">Status</th>
                           <th className="pb-3">Sales</th>
                           <th className="pb-3">Earnings</th>
                           <th className="pb-3 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm">
                        {courses.map((course) => (
                           <tr key={course.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                              <td className="py-4 pl-2 font-bold text-slate-700">{course.name}</td>
                              <td className="py-4">
                                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${course.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {course.status}
                                 </span>
                              </td>
                              <td className="py-4 font-medium text-slate-600">{course.sales}</td>
                              <td className="py-4 font-bold text-slate-900">{course.earnings}</td>
                              <td className="py-4 text-right flex justify-end gap-2">
                                 <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"><FiEdit3 /></button>
                                 <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:bg-red-100 rounded-full text-slate-400 hover:text-red-600 transition-colors"><FiTrash2 /></button>
                              </td>
                           </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr><td colSpan="5" className="text-center py-4 text-slate-400">No courses found. Create one!</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* RIGHT COL */}
         <div className="space-y-8">
            
            {/* ASSIGNMENT CHECKER */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     <FiCheckSquare className="text-indigo-500"/> Submissions
                  </h3>
                  <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">
                     {submissions.filter(s => s.status === 'Pending').length} New
                  </span>
               </div>

               <div className="space-y-4">
                  {submissions.map((sub) => (
                     <div key={sub.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                           {sub.avatar}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-slate-900">{sub.student}</h4>
                              <span className="text-[10px] text-slate-400">{sub.time}</span>
                           </div>
                           <p className="text-xs text-slate-500 line-clamp-1 mb-2">{sub.assignment}</p>
                           <div className="flex gap-2">
                              {sub.status === 'Pending' ? (
                                 <>
                                    <button onClick={() => handleGrade(sub.id)} className="text-[10px] font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">Grade</button>
                                    <button onClick={() => openFileViewer(sub)} className="text-[10px] font-bold border border-slate-200 text-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-100">View</button>
                                 </>
                              ) : (
                                 <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded"><FiCheckSquare /> Graded</span>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* QUICK TOOLS (Fully Working) */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
               <h3 className="text-lg font-bold mb-2 relative z-10">Quick Tools</h3>
               
               <div className="space-y-3 relative z-10">
                  <button onClick={handleDownloadAttendance} disabled={isProcessing} className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-3 rounded-xl text-left text-sm font-bold flex items-center gap-3 transition-all disabled:opacity-50">
                     {isProcessing ? <span className="animate-spin">⏳</span> : <FiDownload />} Export Attendance
                  </button>
                  <button onClick={handleUploadNotes} disabled={isProcessing} className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-3 rounded-xl text-left text-sm font-bold flex items-center gap-3 transition-all disabled:opacity-50">
                     {isProcessing ? <span className="animate-spin">⏳</span> : <FiUpload />} Upload Lecture Notes
                  </button>
                  <button onClick={() => setActiveModal('announcement')} className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-3 rounded-xl text-left text-sm font-bold flex items-center gap-3 transition-all">
                     <FiPlus /> Create Announcement
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* --- MODALS (POPUPS) --- */}

      {/* 1. ANALYTICS MODAL */}
      {activeModal === 'analytics' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white w-full max-w-lg p-6 rounded-3xl shadow-2xl m-4">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-slate-900">Performance Analytics</h3>
                 <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full"><FiX/></button>
              </div>
              <div className="h-48 bg-slate-50 rounded-xl flex items-end justify-between p-4 gap-2 border border-slate-100">
                 {[40, 70, 35, 90, 60, 80].map((h, i) => (
                    <div key={i} className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-all" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
              <p className="text-center text-xs text-slate-400 mt-2">Weekly Engagement Report</p>
           </div>
        </div>
      )}

      {/* 2. CREATE COURSE MODAL */}
      {activeModal === 'createCourse' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl m-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Create New Course</h3>
              <input 
                type="text" 
                placeholder="Course Title (e.g. React Mastery)" 
                className="w-full border border-slate-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-600 outline-none"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
              />
              <div className="flex gap-3">
                 <button onClick={() => setActiveModal(null)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                 <button onClick={handleCreateCourse} disabled={!newCourseName || isProcessing} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                    {isProcessing ? "Creating..." : "Publish Course"}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* 3. ANNOUNCEMENT MODAL */}
      {activeModal === 'announcement' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl m-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">New Announcement</h3>
              <p className="text-xs text-slate-500 mb-4">This will be sent to all enrolled students via email & notification.</p>
              <textarea 
                placeholder="Type your message here..." 
                className="w-full border border-slate-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-600 outline-none h-32 resize-none"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
              <div className="flex gap-3">
                 <button onClick={() => setActiveModal(null)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                 <button onClick={handleSendAnnouncement} disabled={!announcementText || isProcessing} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {isProcessing ? "Sending..." : <><FiSend /> Send Now</>}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* 4. VIEW FILE MODAL */}
      {activeModal === 'viewFile' && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-3xl shadow-2xl m-4 flex flex-col overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                 <div>
                    <h3 className="font-bold text-slate-900">{selectedFile.student}'s Submission</h3>
                    <p className="text-xs text-slate-500">{selectedFile.fileUrl}</p>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"><FiX size={24}/></button>
              </div>
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-8">
                 <div className="text-center text-slate-400">
                    <FiFileText size={64} className="mx-auto mb-4 opacity-50"/>
                    <p>Preview not available for this file type.</p>
                    <button className="mt-4 text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2">
                       <FiDownload /> Download to View
                    </button>
                 </div>
              </div>
              <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                 <button onClick={() => setActiveModal(null)} className="px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Close</button>
                 <button onClick={() => { handleGrade(selectedFile.id); setActiveModal(null); }} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Grade Submission</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}