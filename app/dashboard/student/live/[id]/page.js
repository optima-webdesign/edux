"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  FiMic, FiMicOff, FiVideo, FiVideoOff, FiMessageSquare, 
  FiPhoneMissed, FiUsers, FiSend, FiMaximize 
} from "react-icons/fi";
import { FaHandPaper } from "react-icons/fa";

// --- MOCK DATA FOR CHAT ---
const INITIAL_MESSAGES = [
  { id: 1, user: "System", text: "Welcome to the Live Class via EduNexus.", time: "10:00 AM", type: "system" },
  { id: 2, user: "Sarah (Teacher)", text: "Hello everyone! Can you hear me clearly?", time: "10:02 AM", isTeacher: true },
  { id: 3, user: "Rohan", text: "Yes ma'am, loud and clear!", time: "10:03 AM" },
];

export default function LiveClassroom() {
  const router = useRouter();
  
  // --- STATES ---
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  
  // --- REAL MEDIA STATES ---
  const userVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [permissionError, setPermissionError] = useState(false);

  // Chat States
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const chatScrollRef = useRef(null);

  // --- 1. INITIALIZE REAL CAMERA ---
  useEffect(() => {
    async function enableStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(mediaStream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setPermissionError(true);
      }
    }

    enableStream();

    // Cleanup on unmount (Stop Camera)
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Run once on mount

  // --- 2. HANDLE VIDEO TOGGLE ---
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoOn; // Real hardware toggle
        setVideoOn(!videoOn);
      }
    }
  };

  // --- 3. HANDLE MIC TOGGLE ---
  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !micOn; // Real hardware toggle
        setMicOn(!micOn);
      }
    }
  };

  // Auto-scroll chat logic
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate Fake Student Messages
  useEffect(() => {
    const responses = ["Clear sir", "Please explain hooks again", "Voice lagging slightly", "Understood", "Yes"];
    const names = ["Amit", "Priya", "Rahul", "Sneha", "Vikram"];
    const interval = setInterval(() => {
      const randomMsg = {
        id: Date.now(),
        user: names[Math.floor(Math.random() * names.length)],
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, randomMsg]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), user: "You", text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true 
    }]);
    setNewMessage("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col text-white h-screen w-screen overflow-hidden font-sans">
      
      {/* HEADER */}
      <div className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div> Live
           </div>
           <div>
             <h1 className="text-base font-bold text-slate-100">Advanced React Patterns & Performance</h1>
             <p className="text-xs text-slate-400">Bachelor of Computer Application • Sem 4</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg">
              <FiUsers className="text-indigo-400" /> <span>24 Students</span>
           </div>
        </div>
      </div>

      {/* MAIN STAGE */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className={`flex-1 p-4 grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 transition-all duration-300 ease-in-out ${chatOpen ? 'mr-0' : ''}`}>
           
           {/* TEACHER (Fake Stream) */}
           <div className="col-span-1 md:col-span-3 md:row-span-2 bg-black rounded-2xl relative overflow-hidden border border-slate-800 shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Teacher" />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg">
                 <FiMic className="text-green-400 animate-pulse" /> Suresh Sir (Professor)
              </div>
           </div>

           {/* STUDENTS (Fake Streams) */}
           <div className="hidden md:block bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" className="w-full h-full object-cover" alt="Student" />
              <div className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">Rahul</div>
           </div>
           <div className="hidden md:block bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" className="w-full h-full object-cover" alt="Student" />
              <div className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">Priya</div>
           </div>

           {/* --- YOUR REAL CAMERA FEED --- */}
           <div className="hidden md:block bg-slate-800 rounded-2xl relative overflow-hidden border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/10">
              {permissionError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-red-400 p-2 text-center">
                    <FiVideoOff size={24} className="mb-2"/>
                    <span className="text-xs">Camera Blocked</span>
                  </div>
              ) : videoOn ? (
                 // REAL VIDEO ELEMENT
                 <video 
                    ref={userVideoRef} 
                    autoPlay 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                 />
              ) : (
                 <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold shadow-inner">ME</div>
                 </div>
              )}
              
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                 <span className="text-xs font-bold bg-black/60 px-2 py-1 rounded">You</span>
                 {!micOn && <div className="bg-red-500 p-1 rounded-full"><FiMicOff size={10}/></div>}
              </div>
           </div>
        </div>

        {/* CHAT SIDEBAR */}
        {chatOpen && (
           <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 relative z-40 shadow-xl">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <span className="font-bold text-slate-200 flex items-center gap-2"><FiMessageSquare className="text-indigo-500"/> Live Chat</span>
                <button onClick={() => setChatOpen(false)} className="md:hidden text-slate-400"><FiMaximize/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                 {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className={`text-[11px] font-bold ${msg.isTeacher ? "text-green-400" : "text-slate-400"}`}>{msg.user}</span>
                          <span className="text-[10px] text-slate-600">{msg.time}</span>
                       </div>
                       <div className={`px-3 py-2 rounded-2xl text-sm max-w-[90%] ${msg.isMe ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                          {msg.text}
                       </div>
                    </div>
                 ))}
                 <div ref={chatScrollRef}></div>
              </div>
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900">
                 <div className="relative flex items-center gap-2">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a doubt..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
                    <button type="submit" className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><FiSend size={16} /></button>
                 </div>
              </form>
           </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2 md:gap-4 shrink-0 relative z-50">
         <button onClick={toggleMic} className={`p-3 md:p-4 rounded-full transition-all ${micOn ? 'bg-slate-800 text-white' : 'bg-red-500/10 text-red-500 border border-red-500/50'}`}>
            {micOn ? <FiMic size={20} /> : <FiMicOff size={20} />}
         </button>

         <button onClick={toggleVideo} className={`p-3 md:p-4 rounded-full transition-all ${videoOn ? 'bg-slate-800 text-white' : 'bg-red-500/10 text-red-500 border border-red-500/50'}`}>
            {videoOn ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
         </button>

         <button onClick={() => setHandRaised(!handRaised)} className={`p-3 md:p-4 rounded-full transition-all ${handRaised ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500' : 'bg-slate-800 text-slate-400'}`}>
            <FaHandPaper size={20} />
         </button>

         <button onClick={() => setChatOpen(!chatOpen)} className={`p-3 md:p-4 rounded-full hidden md:block ${chatOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            <FiMessageSquare size={20} />
         </button>
         <div className="w-px h-8 bg-slate-800 mx-2"></div>
         <button onClick={() => router.back()} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold flex items-center gap-2 shadow-lg">
            <FiPhoneMissed /> <span className="hidden md:inline">End Class</span>
         </button>
      </div>
    </div>
  );
}