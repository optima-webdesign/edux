"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Navigation ke liye import
import { useAuth } from "@/context/AuthContext";
import { 
  FiBell, FiSearch, FiMenu, FiLogOut, FiSettings, FiUser 
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Navbar({ onMenuClick }) { 
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter(); // ✅ Router initialize kiya
  
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  // ✅ 1. Updated Search Handler
  const handleSearch = (e) => {
    e.preventDefault(); // Page reload rokne ke liye
    if(query.trim()) {
        toast.loading(`Searching for: "${query}"...`);
        
        // 🚀 Real Redirect Logic
        // Yeh URL ko /dashboard/search?q=your_query par le jayega
        router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
        
        // Mobile menu close logic (optional) if needed later
    } else {
        toast.error("Please enter something to search!");
    }
  };

  const handleLogout = () => {
      logout();
      toast.success("Logged out successfully!");
  };

  const handleNotification = () => {
      toast("No new notifications", { icon: '🔔' });
  };

  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;

  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="md:hidden text-slate-600 text-2xl p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
        >
          <FiMenu />
        </button>

        {/* ✅ Search Bar (Updated) */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-xl w-64 lg:w-96 focus-within:ring-2 focus-within:ring-indigo-100 transition-all cursor-text"
          onClick={() => document.getElementById('searchInput').focus()} // Click anywhere to focus
        >
          {/* ✅ Icon is now a Submit Button */}
          <button type="submit" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <FiSearch className="text-lg" />
          </button>
          
          <input 
            id="searchInput"
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..." 
            className="bg-transparent outline-none text-sm font-medium w-full text-slate-700 placeholder:text-slate-400"
          />
        </form>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button 
            onClick={handleNotification}
            className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95"
        >
          <FiBell size={22} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        <div className="relative" ref={profileRef}>
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-full md:rounded-xl transition-all"
            >
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name || "Guest"}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{user?.role || "Visitor"}</p>
                </div>
                <div className="relative w-9 h-9 md:w-10 md:h-10 shrink-0">
                    <Image 
                        src={avatarUrl} 
                        alt="User" 
                        fill
                        className="rounded-full border border-slate-200 shadow-sm object-cover" 
                    />
                </div>
            </button>

            {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="md:hidden p-4 border-b border-slate-100 bg-slate-50">
                        <p className="text-sm font-bold text-slate-900">{user?.name || "Guest"}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role || "Visitor"}</p>
                    </div>

                    <div className="p-2">
                        <Link 
                            href={`/dashboard/${user?.role}/settings`} 
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <FiSettings size={16} /> Settings
                        </Link>
                        <Link 
                            href={`/dashboard/${user?.role}`} 
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <FiUser size={16} /> Profile
                        </Link>
                    </div>
                    
                    <div className="border-t border-slate-100 p-2">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <FiLogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
