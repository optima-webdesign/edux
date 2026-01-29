import Link from "next/link";
import { 
  FiArrowLeft, FiVideo, FiBarChart2, FiSmartphone, 
  FiAward, FiShield, FiCpu, FiUsers, FiDollarSign 
} from "react-icons/fi";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
       {/* Navbar */}
       <nav className="border-b border-slate-100 p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/"><div className="text-2xl font-bold text-indigo-600 cursor-pointer">EduNexus.</div></Link>
        <div className="flex gap-4">
           <Link href="/login">
              <button className="text-slate-600 font-bold hover:text-indigo-600 px-4 py-2">Login</button>
           </Link>
           <Link href="/login">
              <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition-all">
                Get Started
              </button>
           </Link>
        </div>
      </nav>

      <main>
         {/* Hero Section */}
         <section className="py-20 px-6 text-center max-w-5xl mx-auto">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Why EduNexus?</span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-6 mb-8">
               More than just an LMS. <br/> It’s an <span className="text-indigo-600">Education OS.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
               From live classrooms to automated grading, EduNexus handles the heavy lifting so you can focus on what matters most—teaching.
            </p>
         </section>

         {/* Core Features Grid (Bento Style) */}
         <section className="px-6 max-w-7xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Feature 1 */}
               <div className="col-span-1 md:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                     <FiVideo />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">HD Live Classrooms</h3>
                  <p className="text-slate-500 text-lg">
                     Built-in Zoom-style video conferencing. Includes whiteboard, screen sharing, recording, and attendance tracking—no external apps needed.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                     <FiBarChart2 />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Smart Analytics</h3>
                  <p className="text-slate-400">
                     Real-time insights into student performance, attendance trends, and course engagement.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                     <FiSmartphone />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile First</h3>
                  <p className="text-slate-500">
                     Fully responsive design. Students can learn on the go using any smartphone or tablet.
                  </p>
               </div>

               {/* Feature 4 */}
               <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-3xl hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                     <FiCpu />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">AI-Powered Grading</h3>
                  <p className="text-indigo-100 text-lg">
                     Save hours of manual work. Our AI assists in grading assignments and providing personalized feedback to students instantly.
                  </p>
               </div>
            </div>
         </section>

         {/* Role Specific Features */}
         <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-black text-slate-900">Built for Everyone</h2>
                  <p className="text-slate-500 mt-2">Tailored experiences for every stakeholder.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* For Teachers */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FiUsers size={24}/></div>
                        <h3 className="text-xl font-bold text-slate-900">For Teachers</h3>
                     </div>
                     <ul className="space-y-4">
                        {['Course Creation Wizard', 'Automated Attendance', 'Assignment Grading', 'Student Behavior Reports'].map((item, i) =>(
                           <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span> {item}
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* For Admins */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FiShield size={24}/></div>
                        <h3 className="text-xl font-bold text-slate-900">For Admins</h3>
                     </div>
                     <ul className="space-y-4">
                        {['User Management (RBAC)', 'Financial Overview', 'Audit Logs', 'Platform Settings'].map((item, i) =>(
                           <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> {item}
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* For Parents */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FiDollarSign size={24}/></div>
                        <h3 className="text-xl font-bold text-slate-900">For Parents</h3>
                     </div>
                     <ul className="space-y-4">
                        {['Fee Payment Gateway', 'Child Performance Tracking', 'Attendance Alerts', 'Direct Teacher Chat'].map((item, i) =>(
                           <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span> {item}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="py-20 px-6 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to upgrade your institution?</h2>
            <div className="flex justify-center gap-4">
               <Link href="/login">
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                     Start Free Trial
                  </button>
               </Link>
               <Link href="/contact">
                  <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                     Talk to Sales
                  </button>
               </Link>
            </div>
         </section>

      </main>

      <footer className="border-t border-slate-100 py-10 text-center max-w-7xl mx-auto">
         <Link href="/">
            <button className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
               <FiArrowLeft /> Back to Home
            </button>
         </Link>
      </footer>
    </div>
  );
}