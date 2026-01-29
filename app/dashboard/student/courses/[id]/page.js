"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiPlay, FiLock, FiCheckCircle, FiChevronLeft, FiMenu, 
  FiFileText, FiMessageSquare, FiAward, FiPlayCircle, FiDownload, FiRefreshCw 
} from "react-icons/fi";

// --- MOCK COURSE DATA WITH QUIZ ---
const MOCK_COURSE = {
  id: 1,
  title: "Advanced React Patterns",
  description: "Master the advanced concepts of React including HOCs, Render Props, and Custom Hooks.",
  modules: [
    {
      title: "Module 1: Fundamentals",
      lessons: [
        { id: 101, title: "Introduction to Patterns", type: "video", duration: "10:00", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
        { id: 102, title: "React Hooks Deep Dive", type: "video", duration: "15:30", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
        { 
          id: 103, 
          title: "Module 1 Assessment", 
          type: "quiz", 
          duration: "5 Questions", 
          locked: false,
          questions: [
            { q: "What hook replaces lifecycle methods?", options: ["useState", "useEffect", "useContext"], ans: 1 },
            { q: "Which is NOT a built-in hook?", options: ["useFetch", "useReducer", "useMemo"], ans: 0 },
            { q: "What is the return type of useState?", options: ["Object", "Array", "String"], ans: 1 },
          ]
        }
      ]
    },
    {
      title: "Module 2: Advanced Logic",
      lessons: [
        { id: 201, title: "Higher Order Components", type: "video", duration: "20:00", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", locked: false },
        { 
            id: 202, 
            title: "Final Certification Exam", 
            type: "quiz", 
            duration: "Exam", 
            locked: true, // Will unlock dynamically
            questions: [
              { q: "Context API is used for?", options: ["State Management", "Routing", "Styling"], ans: 0 },
              { q: "React is a?", options: ["Framework", "Library", "Language"], ans: 1 },
            ]
        }
      ]
    }
  ]
};

// --- SUB-COMPONENT: QUIZ ENGINE ---
const QuizEngine = ({ data, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
    if (optionIdx === data.questions[currentQ].ans) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQ < data.questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        // If score > 50%, mark complete
        if ((score + (optionIdx === data.questions[currentQ].ans ? 1 : 0)) >= data.questions.length / 2) {
            onComplete();
        }
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
        <h2 className="text-3xl font-bold mb-2">{passed ? "Assessment Passed!" : "Try Again"}</h2>
        <p className="text-slate-400 mb-6">You scored {score} out of {data.questions.length}</p>
        
        {passed ? (
           <p className="text-green-400 font-bold animate-pulse">Lesson Marked as Complete ✅</p>
        ) : (
           <button 
             onClick={() => { setScore(0); setCurrentQ(0); setShowResult(false); setSelectedOption(null); }}
             className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 flex items-center gap-2"
           >
             <FiRefreshCw /> Retry Quiz
           </button>
        )}
      </div>
    );
  }

  const question = data.questions[currentQ];
  return (
    <div className="flex flex-col justify-center h-full max-w-2xl mx-auto p-6">
       <div className="mb-8">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase">Question {currentQ + 1} of {data.questions.length}</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-2">{question.q}</h2>
       </div>
       <div className="space-y-4">
          {question.options.map((opt, idx) => (
             <button
               key={idx}
               onClick={() => handleAnswer(idx)}
               disabled={selectedOption !== null}
               className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                  selectedOption === idx 
                    ? idx === question.ans ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"
                    : "border-slate-200 hover:border-indigo-500 hover:bg-indigo-50"
               }`}
             >
                {opt}
             </button>
          ))}
       </div>
    </div>
  );
};

// --- SUB-COMPONENT: CERTIFICATE GENERATOR ---
const CertificateDownload = ({ courseName, studentName }) => {
    const canvasRef = useRef(null);

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Border
        ctx.strokeStyle = "#4f46e5"; // Indigo 600
        ctx.lineWidth = 20;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Text
        ctx.textAlign = "center";
        ctx.fillStyle = "#1e293b"; // Slate 800
        
        ctx.font = "bold 40px Arial";
        ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 100);
        
        ctx.font = "20px Arial";
        ctx.fillStyle = "#64748b";
        ctx.fillText("This is to certify that", canvas.width / 2, 160);
        
        ctx.font = "italic bold 50px Georgia";
        ctx.fillStyle = "#1e293b";
        ctx.fillText(studentName, canvas.width / 2, 230);
        
        ctx.font = "20px Arial";
        ctx.fillStyle = "#64748b";
        ctx.fillText("Has successfully completed the course", canvas.width / 2, 290);
        
        ctx.font = "bold 35px Arial";
        ctx.fillStyle = "#4f46e5";
        ctx.fillText(courseName, canvas.width / 2, 350);

        ctx.font = "15px Arial";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width / 2, 450);

        // Trigger Download
        const link = document.createElement('a');
        link.download = `${studentName}-Certificate.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
            <FiAward className="text-indigo-600 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-indigo-900">Congratulations! 🎉</h2>
            <p className="text-indigo-700 mb-6">You have completed all modules.</p>
            <canvas ref={canvasRef} width={800} height={500} className="hidden"></canvas>
            <button 
                onClick={downloadCertificate}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
                <FiDownload /> Download Certificate
            </button>
        </div>
    );
};


// --- MAIN PLAYER COMPONENT ---
export default function CoursePlayer() {
  const router = useRouter();
  const { id } = useParams();
  
  // State
  const [course, setCourse] = useState(MOCK_COURSE);
  const [activeLesson, setActiveLesson] = useState(MOCK_COURSE.modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState([101]); // 101 is pre-completed for demo
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate Progress
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);
  const isCourseCompleted = progress === 100;

  // Mark Lesson Complete Logic
  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      
      // Unlock next lesson (Simulated)
      // Logic: Find next ID and set locked = false (Simplified for demo)
    }
  };

  // Auto-complete video after 5 seconds (Simulating watch time)
  useEffect(() => {
    if (activeLesson.type === 'video' && !completedLessons.includes(activeLesson.id)) {
        const timer = setTimeout(() => {
            markLessonComplete(activeLesson.id);
        }, 5000); // Marks video complete after 5 seconds of "watching"
        return () => clearTimeout(timer);
    }
  }, [activeLesson]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8 font-sans"> 

      {/* --- TOP BAR --- */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:bg-slate-700 p-2 rounded-full transition-colors">
            <FiChevronLeft size={24} />
          </button>
          <div className="border-l border-slate-700 pl-4">
             <h1 className="text-lg font-bold">{course.title}</h1>
             <p className="text-xs text-slate-400 flex items-center gap-2">
                {activeLesson.type === 'video' ? <FiPlayCircle/> : <FiFileText/>} 
                {activeLesson.title}
             </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Progress Bar */}
           <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-green-400 mb-1">{progress}% Completed</p>
              <div className="w-32 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 md:hidden">
             <FiMenu />
           </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT: Player Stage */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
          
          {/* MEDIA PLAYER / QUIZ AREA */}
          <div className="bg-black w-full aspect-video shadow-lg relative group">
            {activeLesson.type === 'video' ? (
              <div className="w-full h-full relative">
                  <iframe 
                    src={`${activeLesson.url}?autoplay=1&mute=0`} 
                    title={activeLesson.title}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                  {/* Overlay for realism */}
                  {!completedLessons.includes(activeLesson.id) && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur">
                          Marking complete in 5s...
                      </div>
                  )}
              </div>
            ) : (
              // RENDER QUIZ ENGINE
              <div className="w-full h-full bg-white overflow-y-auto border-b border-slate-200">
                  <QuizEngine data={activeLesson} onComplete={() => markLessonComplete(activeLesson.id)} />
              </div>
            )}
          </div>

          {/* TABS & INFO */}
          <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto w-full">
            <div className="flex gap-8 border-b border-slate-200 mb-6">
               {['overview', 'q&a', 'notes'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${
                     activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
               {activeTab === 'overview' && (
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">About this lesson</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">{course.description}</p>
                    
                    {/* Certificate Logic */}
                    {isCourseCompleted ? (
                        <CertificateDownload courseName={course.title} studentName="Arjun Mehta" />
                    ) : (
                        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-3 opacity-75">
                           <FiLock className="text-slate-400" size={24} />
                           <div>
                              <h4 className="font-bold text-slate-700">Certificate Locked</h4>
                              <p className="text-sm text-slate-500">Complete all lessons to unlock your certificate.</p>
                           </div>
                        </div>
                    )}
                 </div>
               )}
               
               {activeTab === 'notes' && (
                  <div className="space-y-4">
                      <textarea className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Take notes for this lecture..."></textarea>
                      <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Save Note</button>
                  </div>
               )}
               
               {activeTab === 'q&a' && (
                  <div className="text-center py-10 text-slate-400">
                      <FiMessageSquare size={30} className="mx-auto mb-2 opacity-50"/>
                      <p>No doubts asked yet. Be the first!</p>
                  </div>
               )}
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar Playlist */}
        <div className={`bg-white border-l border-slate-200 w-full md:w-96 flex-shrink-0 flex flex-col transition-all duration-300 absolute md:relative h-full z-20 shadow-2xl md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0 md:hidden"
        }`}>
           <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Course Content</h3>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 hover:bg-slate-200 rounded-full"><FiCheckCircle/></button>
           </div>
           
           <div className="overflow-y-auto flex-1 pb-20">
              {course.modules.map((module, mIdx) => (
                <div key={mIdx}>
                   <div className="bg-slate-50/80 backdrop-blur px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-y border-slate-100 sticky top-0 z-10">
                      {module.title}
                   </div>
                   <div>
                      {module.lessons.map((lesson) => {
                        const isActive = activeLesson.id === lesson.id;
                        const isCompleted = completedLessons.includes(lesson.id);
                        // Simplified unlocking logic: if previous is complete, this is unlocked (simulated)
                        const isLocked = lesson.locked && !completedLessons.includes(lesson.id - 1); 

                        return (
                          <button
                            key={lesson.id}
                            disabled={isLocked}
                            onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 768) setSidebarOpen(false); }}
                            className={`w-full text-left px-4 py-4 flex items-start gap-3 transition-colors border-b border-slate-50 hover:bg-slate-50 group ${
                               isActive ? "bg-indigo-50 border-l-4 border-l-indigo-600" : "border-l-4 border-l-transparent"
                            } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                             <div className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                    <FiCheckCircle className="text-green-500" size={16}/>
                                ) : isLocked ? (
                                    <FiLock className="text-slate-400" size={14}/> 
                                ) : (
                                    lesson.type === 'video' ? <FiPlay className="text-slate-400 group-hover:text-indigo-600" size={14}/> : <FiFileText className="text-slate-400 group-hover:text-indigo-600" size={14}/>
                                )}
                             </div>
                             <div>
                                <p className={`text-sm font-medium line-clamp-1 ${isActive ? "text-indigo-700" : "text-slate-700"}`}>
                                   {lesson.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                   {lesson.type === 'video' ? "Video" : "Quiz"} • {lesson.duration}
                                </p>
                             </div>
                          </button>
                        );
                      })}
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}