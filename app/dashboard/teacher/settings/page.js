"use client";
import { useState } from "react";
import Image from "next/image"; // ✅ Next.js Image Component Import
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiLock, FiSave } from "react-icons/fi";
import { toast } from "react-hot-toast"; // Agar toast lagaya hai toh

export default function TeacherSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        // Toast prefer karein agar lagaya hai
        toast.success("Profile Updated! ✅"); 
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Instructor Settings</h1>
        <p className="text-slate-500 mt-2">Update your teaching profile and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         {/* Tabs */}
         <div className="w-full md:w-64 flex flex-col gap-2">
            {[
               { id: 'profile', icon: FiUser, label: 'Profile' },
               { id: 'security', icon: FiLock, label: 'Security' },
            ].map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${
                    activeTab === tab.id 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "text-slate-500 hover:bg-white hover:text-indigo-600"
                 }`}
               >
                  <tab.icon /> {tab.label}
               </button>
            ))}
         </div>

         {/* Content */}
         <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            {activeTab === 'profile' && (
               <div className="space-y-6">
                  <div className="flex items-center gap-6">
                     {/* ✅ Next.js Image Component */}
                     <div className="relative w-20 h-20 shrink-0">
                        <Image 
                           src={user?.avatar || "https://i.pravatar.cc/150"} 
                           alt={user?.name || "Profile"}
                           fill // Container ko fill karega
                           className="rounded-full border-4 border-slate-50 object-cover"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     </div>
                     
                     <div>
                        <p className="font-bold text-lg">{user?.name}</p>
                        <p className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit uppercase">Senior Instructor</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Subject Specialization</label>
                        <input type="text" defaultValue="Computer Science & Mathematics" className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none" />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                        <input type="email" defaultValue={user?.email} disabled className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-400 bg-slate-50 cursor-not-allowed" />
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'security' && (
               <div className="space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Change Password</label>
                     <input type="password" placeholder="New Password" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                  </div>
               </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
               <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg">
                  {loading ? "Updating..." : <><FiSave /> Update Profile</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}