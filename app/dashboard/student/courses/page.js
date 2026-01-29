"use client";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  FiSearch, FiFilter, FiPlay, FiClock, FiHeart, FiMoreVertical, 
  FiCheckCircle, FiAward, FiBookOpen, FiGrid, FiList, FiArrowRight, FiDownload 
} from "react-icons/fi";

// --- ADVANCED MOCK DATA ---
const INITIAL_COURSES = [
  { 
    id: 1, 
    title: "Advanced React Patterns", 
    instructor: "Suresh Sir", 
    category: "Development",
    totalLessons: 42, 
    completedLessons: 30, 
    progress: 71, 
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    lastAccessed: "2 hours ago",
    isSaved: true,
    status: "in-progress" 
  },
  { 
    id: 2, 
    title: "UI/UX Design Masterclass", 
    instructor: "Anita Ma'am", 
    category: "Design",
    totalLessons: 20, 
    completedLessons: 20,
    progress: 100, 
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
    lastAccessed: "1 day ago",
    isSaved: false,
    status: "completed" 
  },
  { 
    id: 3, 
    title: "Node.js Backend Architecture", 
    instructor: "Vikram Roy", 
    category: "Backend",
    totalLessons: 55, 
    completedLessons: 5, 
    progress: 9, 
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    lastAccessed: "5 mins ago",
    isSaved: false,
    status: "in-progress" 
  },
  { 
    id: 4, 
    title: "Python for Data Science", 
    instructor: "Dr. A. K. Sharma", 
    category: "Data Science",
    totalLessons: 60, 
    completedLessons: 0, 
    progress: 0, 
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    lastAccessed: "Never",
    isSaved: true,
    status: "not-started" 
  },
  { 
    id: 5, 
    title: "Figma Prototyping Secrets", 
    instructor: "Anita Ma'am", 
    category: "Design",
    totalLessons: 15, 
    completedLessons: 12, 
    progress: 80, 
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    lastAccessed: "3 days ago",
    isSaved: false,
    status: "in-progress" 
  },
];

export default function StudentCourses() {
  // --- STATES ---
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); 
  const [sortBy, setSortBy] = useState("recent"); 
  const [viewMode, setViewMode] = useState("grid");
  
  // Certificate Generation State
  const [downloadingId, setDownloadingId] = useState(null);
  const canvasRef = useRef(null);

  // --- ACTIONS ---
  const toggleSave = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, isSaved: !c.isSaved } : c));
  };

  // --- CERTIFICATE GENERATION LOGIC ---
  const handleDownloadCertificate = (course) => {
    setDownloadingId(course.id);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const studentName = "Arjun Mehta"; // Mock Student Name
    
    // 1. Setup Canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Borders
    ctx.strokeStyle = "#4f46e5"; ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.strokeStyle = "#e0e7ff"; ctx.lineWidth = 5;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // 3. Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#1e293b"; ctx.font = "bold 50px serif"; 
    ctx.fillText("CERTIFICATE", canvas.width / 2, 130);
    ctx.font = "20px sans-serif"; ctx.fillStyle = "#4f46e5"; 
    ctx.fillText("OF COMPLETION", canvas.width / 2, 160);

    // 4. Content
    ctx.font = "italic 20px serif"; ctx.fillStyle = "#64748b"; 
    ctx.fillText("This certificate is proudly presented to", canvas.width / 2, 230);

    ctx.font = "bold italic 60px serif"; ctx.fillStyle = "#1e293b"; 
    ctx.fillText(studentName, canvas.width / 2, 300);

    ctx.font = "20px sans-serif"; ctx.fillStyle = "#64748b"; 
    ctx.fillText("For successfully completing the course", canvas.width / 2, 360);

    ctx.font = "bold 35px sans-serif"; ctx.fillStyle = "#4f46e5"; 
    ctx.fillText(course.title, canvas.width / 2, 410);

    // 5. Footer (Date & Instructor)
    const date = new Date().toLocaleDateString();
    ctx.beginPath();
    ctx.moveTo(150, 500); ctx.lineTo(350, 500);
    ctx.moveTo(650, 500); ctx.lineTo(850, 500);
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 2; ctx.stroke();

    ctx.font = "16px sans-serif"; ctx.fillStyle = "#64748b";
    ctx.fillText(date, 250, 530); ctx.fillText("Date", 250, 550);
    ctx.fillText(course.instructor, 750, 530); ctx.fillText("Instructor Signature", 750, 550);

    // 6. Seal
    ctx.beginPath(); ctx.arc(canvas.width / 2, 520, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#fbbf24"; ctx.fill();
    ctx.strokeStyle = "#b45309"; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = "bold 12px sans-serif"; ctx.fillStyle = "#78350f"; ctx.fillText("VERIFIED", canvas.width / 2, 525);

    // 7. Trigger Download (Simulated Delay)
    setTimeout(() => {
        const link = document.createElement('a');
        link.download = `${studentName.replace(' ', '_')}_${course.title.substring(0, 10)}_Cert.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setDownloadingId(null);
    }, 1500);
  };

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedCourses = useMemo(() => {
    let data = [...courses];
    if (search) {
      data = data.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()));
    }
    if (activeTab === "in-progress") data = data.filter(c => c.progress > 0 && c.progress < 100);
    if (activeTab === "completed") data = data.filter(c => c.progress === 100);
    if (activeTab === "saved") data = data.filter(c => c.isSaved);

    if (sortBy === "progress") data.sort((a, b) => b.progress - a.progress);
    if (sortBy === "alpha") data.sort((a, b) => a.title.localeCompare(b.title));

    return data;
  }, [courses, search, activeTab, sortBy]);

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-20">
      
      {/* --- HIDDEN CANVAS FOR CERTIFICATE GENERATION --- */}
      <canvas ref={canvasRef} width={1000} height={600} className="hidden"></canvas>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in slide-in-from-top-4 duration-500">
        <div>
           <h1 className="text-3xl font-extrabold tracking-tight">My Learning Hub</h1>
           <p className="text-slate-500 mt-2 flex items-center gap-2">
              <FiBookOpen className="text-indigo-500"/>
              You have {filteredAndSortedCourses.length} courses in this list.
           </p>
        </div>
      </div>

      {/* --- CONTROLS TOOLBAR --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 md:space-y-0 sticky top-4 z-30">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
           <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <FiSearch className="text-slate-400" size={20} />
              <input type="text" placeholder="Search by course name or instructor..." className="bg-transparent outline-none w-full text-sm font-medium text-slate-700 placeholder:text-slate-400" value={search} onChange={(e) => setSearch(e.target.value)}/>
              {search && <button onClick={() => setSearch("")} className="text-xs font-bold text-indigo-600 hover:underline">Clear</button>}
           </div>
           <div className="flex gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold px-4 py-2 rounded-xl outline-none cursor-pointer hover:bg-slate-100">
                 <option value="recent">Recently Accessed</option>
                 <option value="progress">Progress (High to Low)</option>
                 <option value="alpha">Alphabetical (A-Z)</option>
              </select>
              <div className="bg-slate-50 border border-slate-200 p-1 rounded-xl flex">
                 <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><FiGrid /></button>
                 <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><FiList /></button>
              </div>
           </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar border-t border-slate-100 pt-4 md:border-0 md:pt-0">
           {['all', 'in-progress', 'completed', 'saved'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200'}`}>{tab.replace('-', ' ')}</button>
           ))}
        </div>
      </div>

      {/* --- COURSE GRID / LIST --- */}
      {filteredAndSortedCourses.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredAndSortedCourses.map((course) => (
            <div key={course.id} className={`group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center h-40' : 'flex-col'}`}>
               
               {/* Thumbnail */}
               <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-full' : 'w-full h-48'}`}>
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/dashboard/student/courses/${course.id}/play`}>
                         <button className="bg-white text-slate-900 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"><FiPlay className="ml-1" size={24} /></button>
                      </Link>
                  </div>
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{course.category}</span>
               </div>

               {/* Content */}
               <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                        <button onClick={() => toggleSave(course.id)} className={`transition-colors ${course.isSaved ? 'text-red-500 fill-current' : 'text-slate-300 hover:text-slate-500'}`}><FiHeart className={course.isSaved ? "fill-red-500" : ""} size={20}/></button>
                     </div>
                     <p className="text-sm text-slate-500 font-medium mb-4">{course.instructor}</p>
                  </div>

                  {/* Progress & Actions */}
                  <div>
                     <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
                        <span>{course.progress}% Complete</span>
                        <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                        <div className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${course.progress}%` }}></div>
                     </div>

                     {/* Dynamic Action Buttons */}
                     {course.progress === 100 ? (
                        <button 
                            onClick={() => handleDownloadCertificate(course)}
                            disabled={downloadingId === course.id}
                            className="w-full bg-green-50 text-green-700 border border-green-200 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                           {downloadingId === course.id ? (
                               "Generating..."
                           ) : (
                               <><FiDownload size={18} /> Download Certificate</>
                           )}
                        </button>
                     ) : (
                        <Link href={`/dashboard/student/courses/${course.id}/play`}>
                           <button className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${course.progress === 0 ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}>
                              {course.progress === 0 ? <><FiPlay size={16} /> Start Learning</> : <>Continue Watching <FiPlay size={16} /></>}
                           </button>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100"><FiSearch className="text-4xl text-slate-300" /></div>
            <h3 className="text-xl font-bold text-slate-900">No courses found</h3>
            <p className="text-slate-500 mt-2 max-w-sm">We couldn't find any courses matching "{search}" in the "{activeTab}" category.</p>
            <button onClick={() => { setSearch(""); setActiveTab("all"); }} className="mt-6 text-indigo-600 font-bold hover:underline flex items-center gap-2">Clear all filters</button>
        </div>
      )}
    </div>
  );
}