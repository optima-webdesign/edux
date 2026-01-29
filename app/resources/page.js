"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FiArrowLeft, FiBook, FiVideo, FiUsers, FiCode, 
  FiArrowRight, FiMail, FiSearch 
} from "react-icons/fi";

const CATEGORIES = [
  {
    id: "docs",
    title: "Documentation",
    icon: FiBook,
    desc: "Step-by-step guides to setting up your school, managing students, and grading assignments.",
  },
  {
    id: "academy",
    title: "Video Academy",
    icon: FiVideo,
    desc: "Watch quick video tutorials to master EduNexus features in minutes.",
  },
  {
    id: "community",
    title: "Community Forum",
    icon: FiUsers,
    desc: "Connect with other educators, share teaching tips, and request new features.",
  },
  {
    id: "api",
    title: "Developer API",
    icon: FiCode,
    desc: "Technical documentation for integrating EduNexus with your existing tools.",
  }
];

const LATEST_ARTICLES = [
  {
    category: "Ed-Tech Trends",
    title: "How AI is Reshaping Classroom Grading",
    readTime: "5 min read",
    image: "bg-blue-100"
  },
  {
    category: "Best Practices",
    title: "5 Strategies to Boost Student Engagement Online",
    readTime: "8 min read",
    image: "bg-purple-100"
  },
  {
    category: "Product Update",
    title: "Introducing the New Parent Portal Mobile App",
    readTime: "3 min read",
    image: "bg-green-100"
  }
];

export default function ResourcesPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
       toast.success("Subscribed to newsletter! 📩");
       setEmail("");
    }
  };

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
         {/* Hero */}
         <section className="py-20 px-6 text-center max-w-4xl mx-auto">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Knowledge Hub</span>
            <h1 className="text-5xl font-black text-slate-900 mt-6 mb-6">
               Resources to help you <br/> <span className="text-indigo-600">Teach Better.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10">
               Everything you need to master EduNexus and stay ahead in the world of education technology.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
               <FiSearch className="absolute left-4 top-4 text-slate-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
               <input 
                  type="text" 
                  placeholder="Search guides, articles, or tutorials..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
               />
            </div>
         </section>

         {/* Resource Grid (Updated with Links) */}
         <section className="px-6 max-w-7xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {CATEGORIES.map((item) => (
                  <Link key={item.id} href={`/resources/${item.id}`} className="block h-full">
                      <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all group cursor-pointer h-full">
                         <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <item.icon />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                         <p className="text-slate-500 mb-6 leading-relaxed">{item.desc}</p>
                         <span className="text-indigo-600 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                            Explore <FiArrowRight />
                         </span>
                      </div>
                  </Link>
               ))}
            </div>
         </section>

         {/* Latest Articles */}
         <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
               <div className="flex justify-between items-end mb-12">
                  <div>
                     <h2 className="text-3xl font-black text-slate-900">Latest from the Blog</h2>
                     <p className="text-slate-500 mt-2">Insights for modern educators.</p>
                  </div>
                  <button className="hidden md:block text-indigo-600 font-bold hover:underline">View all posts</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {LATEST_ARTICLES.map((article, i) => (
                     <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group cursor-pointer">
                        <div className={`h-48 ${article.image} w-full`}></div>
                        <div className="p-6">
                           <div className="flex justify-between items-center mb-3">
                              <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">{article.category}</span>
                              <span className="text-xs font-bold text-slate-400">{article.readTime}</span>
                           </div>
                           <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                              {article.title}
                           </h3>
                           <span className="text-sm font-bold text-slate-500 flex items-center gap-1 mt-4">
                              Read Article <FiArrowRight />
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Newsletter CTA */}
         <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
               <div className="relative z-10">
                  <FiMail className="text-5xl text-indigo-400 mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                     Get teaching tips in your inbox
                  </h2>
                  <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                     Join 50,000+ educators who receive our weekly newsletter. No spam, we promise.
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
                     <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                     />
                     <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all">
                        Subscribe
                     </button>
                  </form>
               </div>
               
               {/* Decorative Circles */}
               <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
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