"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  FiHome, FiBook, FiUsers, FiSettings, FiDollarSign, 
  FiCalendar, FiCheckCircle, FiFileText, FiLogOut, FiTrendingUp 
} from "react-icons/fi";

// ✅ Accept closeMobile prop to close sidebar on link click in mobile view
export default function Sidebar({ closeMobile }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Role based navigation logic
  const menus = {
    admin: [
      { name: "Overview", href: "/dashboard/admin", icon: FiHome },
      { name: "User Management", href: "/dashboard/admin/users", icon: FiUsers },
      { name: "Finance", href: "/dashboard/admin/finance", icon: FiDollarSign },
      { name: "Settings", href: "/dashboard/admin/settings", icon: FiSettings },
    ],
    teacher: [
      { name: "Dashboard", href: "/dashboard/teacher", icon: FiHome },
      { name: "Manage Courses", href: "/dashboard/teacher/courses", icon: FiBook },
      { name: "Attendance", href: "/dashboard/teacher/attendance", icon: FiCheckCircle },
      { name: "Grading", href: "/dashboard/teacher/grading", icon: FiFileText },
      { name: "Settings", href: "/dashboard/teacher/settings", icon: FiSettings }, // ✅ Added Settings
    ],
    student: [
      { name: "My Learning", href: "/dashboard/student", icon: FiHome },
      { name: "Courses", href: "/dashboard/student/courses", icon: FiBook },
      { name: "Assignments", href: "/dashboard/student/assignments", icon: FiFileText },
      { name: "Schedule", href: "/dashboard/student/schedule", icon: FiCalendar },
      { name: "Fees", href: "/dashboard/student/fees", icon: FiDollarSign },
      { name: "Settings", href: "/dashboard/student/settings", icon: FiSettings }, // ✅ Added Settings
    ],
    parent: [
      { name: "Child Overview", href: "/dashboard/parent", icon: FiHome },
      { name: "Performance", href: "/dashboard/parent/performance", icon: FiTrendingUp },
      { name: "Fees", href: "/dashboard/parent/fees", icon: FiDollarSign },
      { name: "Settings", href: "/dashboard/parent/settings", icon: FiSettings }, // ✅ Added Settings (Page copy karna mat bhoolna)
    ]
  };

  const links = menus[user.role] || [];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col shadow-xl">
      {/* Brand */}
      <div className="h-16 md:h-20 flex items-center px-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400">
          EduNexus<span className="text-white">.</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={closeMobile} // ✅ Closes sidebar on mobile after clicking
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group ${
                isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <link.icon className={`text-xl ${isActive ? "text-white" : "group-hover:text-indigo-400"}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 px-2 mb-4">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-indigo-500/30 object-cover" 
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-slate-100">{user.name}</p>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{user.role}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </div>
  );
}