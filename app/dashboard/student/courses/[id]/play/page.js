"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiPlay, FiLock, FiCheckCircle, FiChevronLeft, 
  FiFileText, FiAward, FiPlayCircle, FiDownload, 
  FiSave, FiClock, FiTrash2, FiType 
} from "react-icons/fi";

// --- MOCK COURSE DATA ---
const MOCK_COURSE = {
  id: 1,
  title: "Advanced React Patterns",
  instructor: "Suresh Sir",
  description: "Master the advanced concepts of React including HOCs, Render Props, and Custom Hooks.",
  modules: [
    {
      title: "Module 1: Fundamentals",
      lessons: [
        { id: 101, title: "Introduction to Patterns", type: "video", duration: "10:00", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
        { id: 102, title: "React Hooks Deep Dive", type: "video", duration: "15:30", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
      ]
    },
    {
      title: "Module 2: Advanced Logic",
      lessons: [
        { id: 201, title: "Higher Order Components", type: "video", duration: "20:00", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
        { id: 202, title: "Final Quiz", type: "quiz", duration: "5 Qs", locked: false, questions: [
            { q: "React is a?", options: ["Library", "Framework", "Language"], ans: 0 },
            { q: "Which hook manages state?", options: ["useEffect", "useState", "useContext"], ans: 1 }
        ]}
      ]
    }
  ]
};

// --- COMPONENT: REAL CERTIFICATE GENERATOR (CANVAS) ---
const CertificateGenerator = ({ studentName, courseName, instructorName }) => {
  const canvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = "#4f46e5"; 
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.strokeStyle = "#e0e7ff"; 
    ctx.lineWidth = 5;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Text
    ctx.textAlign = "center";
    ctx.fillStyle = "#1e293b"; 
    ctx.font = "bold 50px serif"; 
    ctx.fillText("CERTIFICATE", canvas.width / 2, 130);
    
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#4f46e5"; 
    ctx.fillText("OF COMPLETION", canvas.width / 2, 160);

    ctx.font = "italic 20px serif";
    ctx.fillStyle = "#64748b"; 
    ctx.fillText("This certificate is proudly presented to", canvas.width / 2, 230);

    ctx.font = "bold italic 60px serif";
    ctx.fillStyle = "#1e293b"; 
    ctx.fillText(studentName, canvas.width / 2, 300);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#64748b"; 
    ctx.fillText("For successfully completing the course", canvas.width / 2, 360);

    ctx.font = "bold 35px sans-serif";
    ctx.fillStyle = "#4f46e5"; 
    ctx.fillText(courseName, canvas.width / 2, 410);

    // Footer
    const date = new Date().toLocaleDateString();
    ctx.beginPath();
    ctx.moveTo(150, 500); ctx.lineTo(350, 500);
    ctx.moveTo(650, 500); ctx.lineTo(850, 500);
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 2; ctx.stroke();

    ctx.font = "16px sans-serif"; ctx.fillStyle = "#64748b";
    ctx.fillText(date, 250, 530); ctx.fillText("Date", 250, 550);
    ctx.fillText(instructorName, 750, 530); ctx.fillText("Instructor Signature", 750, 550);

    // Seal
    ctx.beginPath(); ctx.arc(canvas.width / 2, 520, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#fbbf24"; ctx.fill();
    ctx.strokeStyle = "#b45309"; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = "bold 12px sans-serif"; ctx.fillStyle = "#78350f"; ctx.fillText("VERIFIED", canvas.width / 2, 525);

    setTimeout(() => {
        const link = document.createElement('a');
        link.download = `${studentName.replace(' ', '_')}_Certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="mt-8 p-8 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl text-center shadow-sm">
      <FiAward className="text-indigo-600 mx-auto mb-4" size={56} />
      <h2 className="text-2xl font-bold text-slate-900">Congratulations, {studentName}! 🎉</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        You have successfully completed all lessons. Here is your official certificate of completion.
      </p>
      <canvas ref={canvasRef} width={1000} height={600} className="hidden"></canvas>
      <button 
        onClick={handleDownload}
        disabled={isGenerating}
        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-wait"
      >
        {isGenerating ? "Generating..." : <><FiDownload /> Download Certificate</>}
      </button>
    </div>
  );
};

// --- QUIZ ENGINE ---
const QuizEngine = ({ data, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
    if (optionIdx === data.questions[currentQ].ans) setScore(score + 1);
    
    setTimeout(() => {
      if (currentQ < data.questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        if ((score + (optionIdx === data.questions[currentQ].ans ? 1 : 0)) >= data.questions.length / 2) onComplete();
      }
    }, 800);
  };

  if (showResult) {
    const passed = score >= data.questions.length / 2;
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-8 text-center">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
           {passed ? '🏆' : '❌'}
        </div>
        <h2 className="text-3xl font-bold mb-2">{passed ? "Lesson Passed!" : "Try Again"}</h2>
        <p className="text-slate-400 mb-6">Score: {score}/{data.questions.length}</p>
        {!passed && <button onClick={() => { setScore(0); setCurrentQ(0); setShowResult(false); setSelectedOption(null); }} className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold">Retry</button>}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full max-w-2xl mx-auto p-6">
       <h2 className="text-2xl font-bold text-slate-800 mb-6">{data.questions[currentQ].q}</h2>
       <div className="space-y-4">
          {data.questions[currentQ].options.map((opt, idx) => (
             <button key={idx} onClick={() => handleAnswer(idx)} disabled={selectedOption !== null} className={`w-full text-left p-4 rounded-xl border-2 font-medium ${selectedOption === idx ? (idx === data.questions[currentQ].ans ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700") : "border-slate-200 hover:border-indigo-500"}`}>{opt}</button>
          ))}
       </div>
    </div>
  );
};

// --- NOTES COMPONENT (ADVANCED) ---
const NotesTab = ({ lessonId }) => {
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedTime, setSavedTime] = useState(null);

  // Load note from local storage based on Lesson ID
  useEffect(() => {
    const savedNote = localStorage.getItem(`note_${lessonId}`);
    if (savedNote) setNote(savedNote);
    else setNote("");
  }, [lessonId]);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem(`note_${lessonId}`, note);
    setTimeout(() => {
      setIsSaving(false);
      setSavedTime(new Date().toLocaleTimeString());
    }, 800);
  };

  const handleDownloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([note], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Lesson_${lessonId}_Notes.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const addTimestamp = () => {
    // Simulating fetching video time
    const time = "04:23"; 
    setNote(prev => prev + `\n[${time}] `);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-900">My Notes</h2>
        <div className="flex gap-2">
          <button onClick={addTimestamp} className="text-xs font-bold flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-200">
             <FiClock /> Timestamp
          </button>
          <button onClick={handleDownloadNote} className="text-xs font-bold flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-100">
             <FiDownload /> Export
          </button>
        </div>
      </div>
      
      <div className="relative">
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-64 p-5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed bg-slate-50/50"
          placeholder="Start typing your notes here... (Auto-saved locally)"
        ></textarea>
        
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          {savedTime && <span className="text-xs text-slate-400">Saved at {savedTime}</span>}
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all ${isSaving ? 'bg-green-500' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            <FiSave /> {isSaving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-700 flex items-center gap-2">
         <FiType size={14} />
         <strong>Tip:</strong> These notes are stored in your browser. You won't lose them if you refresh.
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function CoursePlayer() {
  const router = useRouter();
  const { id } = useParams();
  
  const [activeLesson, setActiveLesson] = useState(MOCK_COURSE.modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState([101, 102]); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const totalLessons = 4;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);
  const isCourseCompleted = completedLessons.length === totalLessons;

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  useEffect(() => {
    if(activeLesson.type === 'video' && !completedLessons.includes(activeLesson.id)){
        const timer = setTimeout(() => markLessonComplete(activeLesson.id), 5000); 
        return () => clearTimeout(timer);
    }
  }, [activeLesson]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8 font-sans"> 
      {/* HEADER */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:bg-slate-700 p-2 rounded-full"><FiChevronLeft size={24} /></button>
          <div>
             <h1 className="text-lg font-bold">{MOCK_COURSE.title}</h1>
             <p className="text-xs text-slate-400">{activeLesson.title}</p>
          </div>
        </div>
        <div className="hidden md:block w-48 text-right">
           <p className="text-xs font-bold text-green-400 mb-1">{progress}% Complete</p>
           <div className="w-full bg-slate-700 h-1.5 rounded-full"><div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
          
          {/* MEDIA PLAYER AREA */}
          <div className="bg-black w-full aspect-video shadow-lg relative group">
            {activeLesson.type === 'video' ? (
              <div className="w-full h-full relative">
                 <iframe src={`${activeLesson.url}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                 {!completedLessons.includes(activeLesson.id) && <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur">Completing in 5s...</div>}
              </div>
            ) : (
              <div className="w-full h-full bg-white overflow-y-auto border-b border-slate-200">
                  <QuizEngine data={activeLesson} onComplete={() => markLessonComplete(activeLesson.id)} />
              </div>
            )}
          </div>

          {/* TABS AREA */}
          <div className="p-8 max-w-4xl mx-auto w-full">
             <div className="flex gap-8 border-b border-slate-200 mb-6">
                 <button onClick={() => setActiveTab("overview")} className={`pb-3 font-bold border-b-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Overview</button>
                 <button onClick={() => setActiveTab("notes")} className={`pb-3 font-bold border-b-2 ${activeTab === 'notes' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Notes</button>
             </div>

             {/* TAB CONTENT */}
             {activeTab === 'overview' && (
               <div className="animate-in fade-in slide-in-from-bottom-2">
                 <h2 className="text-2xl font-bold mb-2">About this lesson</h2>
                 <p className="text-slate-600 mb-8">{MOCK_COURSE.description}</p>
                 
                 {isCourseCompleted ? (
                    <CertificateGenerator 
                        studentName="Arjun Mehta" 
                        courseName={MOCK_COURSE.title} 
                        instructorName={MOCK_COURSE.instructor} 
                    />
                 ) : (
                    <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl flex items-center gap-4 opacity-75">
                       <div className="bg-slate-200 p-3 rounded-full text-slate-400"><FiLock size={24}/></div>
                       <div>
                          <h4 className="font-bold text-slate-700">Certificate Locked</h4>
                          <p className="text-sm text-slate-500">Complete all {totalLessons} lessons to unlock your certificate.</p>
                       </div>
                    </div>
                 )}
               </div>
             )}

             {activeTab === 'notes' && (
                <NotesTab lessonId={activeLesson.id} />
             )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className={`bg-white border-l border-slate-200 w-96 flex-col ${sidebarOpen ? "flex" : "hidden"}`}>
           <div className="p-4 border-b border-slate-100 font-bold bg-slate-50">Course Content</div>
           <div className="overflow-y-auto flex-1 pb-20">
              {MOCK_COURSE.modules.map((mod, i) => (
                <div key={i}>
                   <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase bg-slate-50 border-y sticky top-0">{mod.title}</div>
                   {mod.lessons.map(lesson => (
                      <button key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-slate-50 border-b border-slate-50 group ${activeLesson.id === lesson.id ? "bg-indigo-50 border-l-4 border-l-indigo-600" : "border-l-4 border-l-transparent"}`}>
                         <div className="mt-1 text-slate-400 group-hover:text-indigo-600">{completedLessons.includes(lesson.id) ? <FiCheckCircle className="text-green-500"/> : (lesson.type === 'video' ? <FiPlayCircle/> : <FiFileText/>)}</div>
                         <div className={`text-sm font-medium ${activeLesson.id === lesson.id ? "text-indigo-700" : "text-slate-700"}`}>{lesson.title}</div>
                      </button>
                   ))}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}