"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiLock, FiBell, FiSave, FiCamera } from "react-icons/fi";

export default function ParentSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert("Settings Saved Successfully! ✅");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Parent Settings</h1>
        <p className="text-slate-500 mt-2">Manage your contact details and child alerts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         {/* Tabs */}
         <div className="w-full md:w-64 flex flex-col gap-2">
            {[
               { id: 'profile', icon: FiUser, label: 'My Profile' },
               { id: 'security', icon: FiLock, label: 'Security' },
               { id: 'notifications', icon: FiBell, label: 'Alerts' },
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
                     <img src={user?.avatar} className="w-20 h-20 rounded-full border-4 border-slate-50" alt="" />
                     <div>
                        <button className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg">Change Photo</button>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:border-indigo-500" />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                        <input type="email" defaultValue={user?.email} className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:border-indigo-500" />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:border-indigo-500" />
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'security' && (
               <div className="space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                     <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                     <input type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                  </div>
               </div>
            )}

            {activeTab === 'notifications' && (
               <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">SMS & Email Alerts</h3>
                  {['Notify when Rahul is Absent', 'Notify when Fees are due', 'Weekly Report Card'].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                        <span className="font-bold text-slate-700 text-sm">{item}</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 cursor-pointer" />
                     </div>
                  ))}
               </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
               <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg">
                  {loading ? "Saving..." : <><FiSave /> Save Changes</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}