"use client";
import { useState } from "react";
import Image from "next/image";
import { 
  FiUser, FiLock, FiBell, FiServer, FiSave, FiUploadCloud, 
  FiMoon, FiSun, FiMonitor, FiShield, FiAlertTriangle, FiToggleRight, FiToggleLeft
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  
  // Fake State for Settings
  const [settings, setSettings] = useState({
    siteName: "EduNexus Global",
    supportEmail: "support@edunexus.com",
    maintenanceMode: false,
    twoFactor: true,
    emailNotifs: true,
    theme: "system"
  });

  // --- ACTIONS ---

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        toast.success("Settings saved successfully! 🚀");
    }, 1500);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key} updated`, { icon: '🔄' });
  };

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
    toast.success(`Theme set to ${theme}`, { icon: '🎨' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pb-20 font-sans text-slate-900">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Platform Configuration</h1>
        <p className="text-slate-500 mt-2">Manage your account settings and system preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         
         {/* --- LEFT SIDEBAR (TABS) --- */}
         <div className="w-full lg:w-64 shrink-0 space-y-2">
            {[
               { id: "general", label: "General", icon: <FiUser /> },
               { id: "security", label: "Security", icon: <FiLock /> },
               { id: "notifications", label: "Notifications", icon: <FiBell /> },
               { id: "system", label: "System & Danger", icon: <FiServer /> },
            ].map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                     activeTab === tab.id 
                     ? "bg-slate-900 text-white shadow-lg" 
                     : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
               >
                  {tab.icon} {tab.label}
               </button>
            ))}
         </div>

         {/* --- RIGHT CONTENT AREA --- */}
         <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            
            {/* 1. GENERAL SETTINGS */}
            {activeTab === "general" && (
               <div className="p-8 space-y-8">
                  <div>
                     <h3 className="text-xl font-bold mb-1">Profile & Branding</h3>
                     <p className="text-sm text-slate-500">Update your dashboard appearance.</p>
                  </div>

                  <div className="flex items-center gap-6">
                     <div className="relative w-24 h-24 group cursor-pointer">
                        <Image 
                           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" 
                           alt="Avatar"
                           fill
                           className="rounded-full object-cover border-4 border-slate-50 shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <FiUploadCloud className="text-white" size={24}/>
                        </div>
                     </div>
                     <div>
                        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Change Avatar</button>
                        <p className="text-[10px] text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Platform Name</label>
                        <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Support Email</label>
                        <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({...settings, supportEmail: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-500 uppercase">Interface Theme</label>
                     <div className="grid grid-cols-3 gap-4">
                        {['light', 'dark', 'system'].map(theme => (
                           <button 
                              key={theme}
                              onClick={() => handleThemeChange(theme)}
                              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${settings.theme === theme ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-300'}`}
                           >
                              {theme === 'light' ? <FiSun /> : theme === 'dark' ? <FiMoon /> : <FiMonitor />}
                              <span className="text-xs font-bold capitalize">{theme}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* 2. SECURITY SETTINGS */}
            {activeTab === "security" && (
               <div className="p-8 space-y-8">
                  <div>
                     <h3 className="text-xl font-bold mb-1">Security & Login</h3>
                     <p className="text-sm text-slate-500">Manage your password and 2FA.</p>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-8">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-500" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                           <input type="password" placeholder="Enter new password" className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-500" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
                           <input type="password" placeholder="Repeat password" className="w-full border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-500" />
                        </div>
                     </div>
                     <button onClick={handleSave} className="text-indigo-600 font-bold text-sm hover:underline">Update Password</button>
                  </div>

                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2"><FiShield className="text-green-600"/> Two-Factor Authentication</h4>
                        <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                     </div>
                     <button onClick={() => toggleSetting('twoFactor')} className={`text-2xl transition-colors ${settings.twoFactor ? 'text-green-500' : 'text-slate-300'}`}>
                        {settings.twoFactor ? <FiToggleRight size={36}/> : <FiToggleLeft size={36}/>}
                     </button>
                  </div>
               </div>
            )}

            {/* 3. NOTIFICATIONS */}
            {activeTab === "notifications" && (
               <div className="p-8 space-y-8">
                  <div>
                     <h3 className="text-xl font-bold mb-1">Notifications</h3>
                     <p className="text-sm text-slate-500">Choose what we contact you about.</p>
                  </div>

                  <div className="space-y-6">
                     {['Email Notification', 'Push Notification', 'Monthly Report', 'New User Signups'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0">
                           <span className="font-bold text-sm text-slate-700">{item}</span>
                           <button onClick={() => toast.success(`${item} updated`)} className="text-2xl text-indigo-600">
                              <FiToggleRight size={36}/>
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* 4. SYSTEM & DANGER */}
            {activeTab === "system" && (
               <div className="p-8 space-y-8">
                  <div>
                     <h3 className="text-xl font-bold mb-1">System Settings</h3>
                     <p className="text-sm text-slate-500">Advanced configurations and danger zone.</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                     <div>
                        <h4 className="font-bold text-yellow-800 flex items-center gap-2"><FiAlertTriangle/> Maintenance Mode</h4>
                        <p className="text-xs text-yellow-700 mt-1">Disable access for all users except admins.</p>
                     </div>
                     <button onClick={() => toggleSetting('maintenanceMode')} className={`text-2xl transition-colors ${settings.maintenanceMode ? 'text-yellow-600' : 'text-slate-300'}`}>
                        {settings.maintenanceMode ? <FiToggleRight size={36}/> : <FiToggleLeft size={36}/>}
                     </button>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                     <h4 className="font-bold text-red-600 mb-4">Danger Zone</h4>
                     <div className="flex gap-4">
                        <button onClick={() => { if(confirm("Clear all cache?")) toast.success("Cache Cleared!") }} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50">
                           Clear System Cache
                        </button>
                        <button onClick={() => { if(confirm("Are you crazy? This will delete everything!")) toast.error("Action Blocked: Demo Mode") }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200">
                           Delete All Data
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* FOOTER ACTIONS */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
               <button onClick={() => toast("Changes Discarded")} className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-white transition-all">Cancel</button>
               <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-wait"
               >
                  {loading ? <span className="animate-spin">⏳</span> : <FiSave />} Save Changes
               </button>
            </div>

         </div>
      </div>
    </div>
  );
}