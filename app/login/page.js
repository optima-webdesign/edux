"use client";
import { useState } from "react";
import Link from "next/link"; // ✅ Back Button ke liye
import { useAuth } from "@/context/AuthContext";
import { 
  FiLock, FiMail, FiArrowRight, FiCheckCircle, 
  FiEye, FiEyeOff, FiArrowLeft, FiHome 
} from "react-icons/fi";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(form.email, form.password);
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
      }
    }, 1500);
  };

  const fillDemo = (role) => {
    setError("");
    const credentials = {
      admin: { email: "admin@edu.com", password: "123" },
      teacher: { email: "teacher@edu.com", password: "123" },
      student: { email: "student@edu.com", password: "123" },
      parent: { email: "parent@edu.com", password: "123" },
    };
    setForm(credentials[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-slate-900 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      {/* ✅ BACK BUTTON */}
      <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-all hover:-translate-x-1 font-bold group">
         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 backdrop-blur-sm">
            <FiArrowLeft size={20} />
         </div>
         <span>Back to Home</span>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden min-h-[600px] relative z-10 mx-4 border border-white/20">
        
        {/* Left Side: Branding (Visuals) */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-purple-800 text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-700 font-black text-xl shadow-lg">E</div>
                <span className="font-bold text-xl tracking-wide opacity-90">EduNexus.</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              One Account.<br/>
              <span className="text-indigo-200">Infinite Possibilities.</span>
            </h1>
            <p className="text-indigo-100 text-lg opacity-90 max-w-sm">
              Seamlessly connect Admins, Teachers, Students, and Parents in one unified ecosystem.
            </p>
          </div>

          {/* Feature Pill */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
             <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-indigo-900 shadow-lg">
                <FiCheckCircle size={24} />
             </div>
             <div>
                <p className="font-bold text-white">Secure Access</p>
                <p className="text-xs text-indigo-200">Bank-grade encryption for your data.</p>
             </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back! 👋</h2>
            <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors text-lg" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-slate-900 font-bold placeholder:font-normal placeholder:text-slate-400"
                  placeholder="name@edunexus.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors text-lg" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-slate-900 font-bold placeholder:font-normal placeholder:text-slate-400"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-3 animate-pulse">
                <FiArrowRight /> {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 hover:shadow-indigo-200 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   Authenticating...
                </div>
              ) : (
                <>Sign In <FiArrowRight /></>
              )}
            </button>
          </form>

          {/* Quick Access Demo Roles */}
          <div className="mt-10 pt-8 border-t border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Quick Access (Click to Fill)</p>
             <div className="flex flex-wrap gap-2 justify-center">
                {['admin', 'teacher', 'student', 'parent'].map((role) => (
                    <button 
                        key={role}
                        onClick={() => fillDemo(role)}
                        className={`py-2 px-4 rounded-lg text-xs font-bold uppercase transition-all transform active:scale-95 border ${
                            role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100' :
                            role === 'teacher' ? 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100' :
                            role === 'student' ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100' :
                            'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                        }`}
                    >
                        {role}
                    </button>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}