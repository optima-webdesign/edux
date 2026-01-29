"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiLock, FiBell, FiSave, FiCheck, FiCamera } from "react-icons/fi";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert("Changes Saved Successfully! ✅");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-2">Manage your profile details and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         {/* Sidebar Tabs */}
         <div className="w-full md:w-64 flex flex-col gap-2">
            {[
               { id: 'profile', icon: FiUser, label: 'My Profile' },
               { id: 'security', icon: FiLock, label: 'Security' },
               { id: 'notifications', icon: FiBell, label: 'Notifications' },
            ].map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${
                    activeTab === tab.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                    : "text-slate-500 hover:bg-white hover:text-indigo-600"
                 }`}
               >
                  <tab.icon /> {tab.label}
               </button>
            ))}
         </div>

         {/* Main Form Area */}
         <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
               <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Public Profile</h3>
                  
                  <div className="flex items-center gap-6">
                     <div className="relative group cursor-pointer">
                        <img src={user?.avatar} className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm" alt="" />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                           <FiCamera />
                        </div>
                     </div>
                     <div>
                        <button className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                           Upload New Photo
                        </button>
                        <p className="text-[10px] text-slate-400 mt-2">JPG, GIF or PNG. Max size 800K</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                        <input type="text" defaultValue={user?.role} disabled className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 bg-slate-50 cursor-not-allowed capitalize" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                        <input type="email" defaultValue={user?.email} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Bio / About</label>
                        <textarea rows="3" placeholder="Tell us something about yourself..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"></textarea>
                     </div>
                  </div>
               </div>
            )}
            
            {/* SECURITY TAB */}
            {activeTab === 'security' && (
               <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Password & Security</h3>
                  <div className="space-y-4 max-w-md">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                        <input type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500" />
                     </div>
                  </div>
               </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
               <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Preferences</h3>
                  <div className="space-y-4">
                     {['Email me when class starts', 'Notify on new assignments', 'Weekly progress report'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                           <span className="font-bold text-slate-700 text-sm">{item}</span>
                           <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Footer Save Button */}
            <div className="pt-6 mt-8 border-t border-slate-100 flex justify-end">
               <button 
                 onClick={handleSave}
                 disabled={loading}
                 className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 active:scale-95"
               >
                  {loading ? (
                     <span className="animate-pulse">Saving Changes...</span>
                  ) : (
                     <><FiSave /> Save Changes</>
                  )}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}