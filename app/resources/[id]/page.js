import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  FiArrowLeft, FiCheckCircle, FiPlayCircle, 
  FiMessageSquare, FiCode, FiFileText 
} from "react-icons/fi";

// --- DYNAMIC DATA ---
const RESOURCE_DATA = {
  docs: {
    title: "Documentation",
    subtitle: "Everything you need to configure EduNexus.",
    icon: FiFileText,
    color: "text-blue-600 bg-blue-50",
    content: [
      { title: "Getting Started", items: ["Installation Guide", "System Requirements", "First Login"] },
      { title: "User Management", items: ["Adding Students Bulk", "Managing Teacher Roles", "Parent Access"] },
      { title: "Billing", items: ["Setting up Payment Gateway", "Invoice Generation", "Refund Policy"] },
    ]
  },
  academy: {
    title: "Video Academy",
    subtitle: "Master the platform with these video tutorials.",
    icon: FiPlayCircle,
    color: "text-red-600 bg-red-50",
    content: [
      { title: "For Teachers", items: ["How to create a Quiz (5 min)", "Grading Assignments (3 min)", "Live Class Setup (8 min)"] },
      { title: "For Admins", items: ["Dashboard Overview (10 min)", "Exporting Reports (4 min)"] },
    ]
  },
  community: {
    title: "Community Forum",
    subtitle: "Join the conversation with other educators.",
    icon: FiMessageSquare,
    color: "text-purple-600 bg-purple-50",
    content: [
      { title: "Trending Topics", items: ["Best practices for hybrid learning", "Feature Request: Dark Mode", "How to engage parents?"] },
    ]
  },
  api: {
    title: "Developer API",
    subtitle: "Integrate EduNexus with your custom stack.",
    icon: FiCode,
    color: "text-green-600 bg-green-50",
    content: [
      { title: "Endpoints", items: ["GET /api/v1/students", "POST /api/v1/attendance", "GET /api/v1/courses"] },
      { title: "Authentication", items: ["API Keys", "OAuth 2.0 Setup"] },
    ]
  }
};

// ✅ Updated: Added 'async' keyword
export default async function ResourceDetailsPage({ params }) {
  
  // ✅ Updated: Added 'await' keyword before params
  const { id } = await params;
  
  const data = RESOURCE_DATA[id];

  // Agar ID galat hai (jaise /resources/kuchbhi), toh 404 page dikhao
  if (!data) {
    return notFound();
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Minimal */}
      <nav className="border-b border-slate-100 p-6 flex items-center max-w-5xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/resources">
            <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
                <FiArrowLeft /> Back to Resources
            </button>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${data.color}`}>
                <Icon />
            </div>
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">{data.title}</h1>
                <p className="text-xl text-slate-500">{data.subtitle}</p>
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8">
            {data.content.map((section, index) => (
                <div key={index} className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                        {section.title}
                    </h2>
                    <ul className="space-y-4">
                        {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {id === 'academy' ? <FiPlayCircle /> : <FiCheckCircle />}
                                </div>
                                <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-slate-900 text-white p-8 rounded-3xl text-center">
            <h3 className="text-xl font-bold mb-2">Need more help with {data.title}?</h3>
            <p className="text-slate-400 mb-6">Our support team is available 24/7.</p>
            <Link href="/contact">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50">
                    Contact Support
                </button>
            </Link>
        </div>

      </main>
    </div>
  );
}