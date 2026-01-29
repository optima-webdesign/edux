"use client";
import { useState, useEffect } from "react";
import RevenueChart from "@/components/RevenueChart"; 
import { 
  FiUsers, FiTrendingUp, FiDownload, FiActivity, FiServer, 
  FiAlertCircle, FiCheckCircle, FiDollarSign, FiClock, FiSettings,
  FiX, FiLock, FiUnlock, FiFileText, FiRefreshCw, FiSearch
} from "react-icons/fi";

// --- MOCK DATA ---
const ADMIN_STATS = [
  { label: "Total Revenue", value: "₹42,50,000", icon: <FiDollarSign />, color: "bg-green-500", trend: "+12.5%" },
  { label: "Total Students", value: "2,450", icon: <FiUsers />, color: "bg-blue-500", trend: "+5.2%" },
  { label: "Active Courses", value: "48", icon: <FiActivity />, color: "bg-purple-500", trend: "Stable" },
];

const RECENT_LOGS = [
  { id: 1, action: "New User Registered", user: "Rahul V.", time: "Just now", type: "success" },
  { id: 2, action: "Payment Failed", user: "Amit K.", time: "2 mins ago", type: "error" },
  { id: 3, action: "Course Published", user: "Suresh Sir", time: "15 mins ago", type: "info" },
];

const INITIAL_USERS = [
  { id: 1, name: "Rahul Verma", email: "rahul@gmail.com", status: "Active", role: "Student" },
  { id: 2, name: "Suresh Sir", email: "suresh@edunexus.com", status: "Active", role: "Instructor" },
  { id: 3, name: "Amit Kumar", email: "amit.k@yahoo.com", status: "Suspended", role: "Student" },
  { id: 4, name: "Sneha Gupta", email: "sneha@gmail.com", status: "Active", role: "Student" },
  { id: 5, name: "Vikram Roy", email: "vikram@edunexus.com", status: "Active", role: "Instructor" },
];

export default function AdminDashboard() {
  // --- STATES ---
  const [isDownloading, setIsDownloading] = useState(false);
  const [liveUsers, setLiveUsers] = useState(142);
  const [cpuLoad, setCpuLoad] = useState(24);
  const [systemStatus, setSystemStatus] = useState("Operational");
  
  // Modals & Actions
  const [activeModal, setActiveModal] = useState(null); 
  const [userList, setUserList] = useState(INITIAL_USERS);
  const [searchUser, setSearchUser] = useState("");
  const [toast, setToast] = useState(null);
  const [chartPeriod, setChartPeriod] = useState("This Year");
  const [isChartLoading, setIsChartLoading] = useState(false);

  // --- LIVE SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      setCpuLoad(prev => {
        const newLoad = prev + Math.floor(Math.random() * 10) - 5;
        return newLoad > 100 ? 90 : newLoad < 10 ? 15 : newLoad;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- TOAST NOTIFICATION ---
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- ACTIONS & CSV GENERATOR ---

  const generateCSV = (type) => {
    setIsDownloading(true);
    
    // Simulate Processing Delay
    setTimeout(() => {
      let csvContent = "";
      let fileName = "";

      if (type === 'MAIN') {
        csvContent = "data:text/csv;charset=utf-8," 
          + "Report,System_Report_2024\n"
          + "Generated_By,Admin\n"
          + "Status,Operational\n"
          + "Active_Users,2450\n"
          + "Total_Revenue,4250000";
        fileName = "Full_System_Report.csv";
      } 
      else if (type === 'FINANCIAL') {
        csvContent = "data:text/csv;charset=utf-8," 
          + "Transaction_ID,Date,Amount,Type,Status\n"
          + "TXN001,2024-01-01,5000,Credit,Success\n"
          + "TXN002,2024-01-02,2500,Credit,Success\n"
          + "TXN003,2024-01-03,1000,Refund,Processed\n"
          + "TXN004,2024-01-05,5000,Credit,Failed";
        fileName = "Financial_Report_2024.csv";
      } 
      else if (type === 'GROWTH') {
        csvContent = "data:text/csv;charset=utf-8," 
          + "Month,New_Signups,Active_Users,Churn_Rate\n"
          + "January,120,2100,2%\n"
          + "February,145,2250,1.8%\n"
          + "March,180,2450,1.5%";
        fileName = "User_Growth_Analytics.csv";
      }

      // Trigger Download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      setActiveModal(null); // Close modal if open
      showToast(`${fileName} Downloaded Successfully! 📥`);
    }, 2000);
  };

  const toggleUserStatus = (id) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${u.name} is now ${newStatus}`, newStatus === 'Active' ? 'success' : 'error');
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleChartChange = (e) => {
    setChartPeriod(e.target.value);
    setIsChartLoading(true);
    setTimeout(() => setIsChartLoading(false), 800); 
  };

  const filteredUsers = userList.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase()));

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-20 relative">
      
      {/* --- TOAST --- */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-3 rounded-xl shadow-2xl text-white font-bold animate-in slide-in-from-top-5 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
           {toast.msg}
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in slide-in-from-top-4 duration-500">
        <div>
           <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {systemStatus}
              </span>
           </div>
           <p className="text-slate-500 font-medium">Platform performance and system health.</p>
        </div>
        
        <div className="flex gap-3">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
                <FiServer className="text-slate-400" />
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">CPU Load</p>
                    <p className={`text-sm font-bold ${cpuLoad > 80 ? 'text-red-600' : 'text-slate-700'}`}>{cpuLoad}%</p>
                </div>
            </div>
            <button 
                onClick={() => generateCSV('MAIN')}
                disabled={isDownloading}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
                {isDownloading ? <span className="animate-spin">⏳</span> : <FiDownload />}
                {isDownloading ? "Generating..." : "Download Report"}
            </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
               </div>
               <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
               <FiTrendingUp /> {stat.trend}
            </div>
          </div>
        ))}
        
        {/* Live Users Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 animate-pulse"></div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Live Users</p>
            <h3 className="text-4xl font-extrabold">{liveUsers}</h3>
            <p className="text-xs text-indigo-200 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span> Real-time
            </p>
        </div>
      </div>

      {/* --- CHARTS & ACTIVITY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Revenue Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
                <select 
                  value={chartPeriod}
                  onChange={handleChartChange}
                  className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg p-2 outline-none cursor-pointer hover:bg-slate-100"
                >
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>Last Month</option>
                </select>
            </div>
            <div className={`h-[300px] w-full transition-opacity duration-300 ${isChartLoading ? 'opacity-50' : 'opacity-100'}`}>
                <RevenueChart />
            </div>
            {isChartLoading && (
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold text-indigo-600 flex items-center gap-2">
                     <FiRefreshCw className="animate-spin"/> Updating Data...
                  </div>
               </div>
            )}
         </div>

         {/* Right Side Panel */}
         <div className="space-y-6">
            {/* Live Logs */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col h-[60%]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><FiActivity className="text-indigo-400"/> Live Logs</h3>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded text-slate-300">REAL-TIME</span>
                </div>
                <div className="space-y-4 overflow-hidden">
                   {RECENT_LOGS.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer animate-in slide-in-from-right-2">
                         <div className={`w-2 h-2 rounded-full ${log.type === 'success' ? 'bg-green-500' : log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                         <div className="flex-1">
                            <p className="text-sm font-bold truncate">{log.action}</p>
                            <p className="text-xs text-slate-400">{log.user}</p>
                         </div>
                         <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                      </div>
                   ))}
                </div>
                <button 
                  onClick={() => setActiveModal('logs')}
                  className="w-full bg-indigo-600 py-3 rounded-xl font-bold mt-auto hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 text-sm"
                >
                   View All Logs
                </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-[35%]">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FiSettings /> Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setActiveModal('users')}
                      className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex flex-col items-center gap-2"
                    >
                        <FiUsers size={20} /> Manage Users
                    </button>
                    <button 
                      onClick={() => setActiveModal('reports')}
                      className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-green-600 hover:border-green-200 transition-all flex flex-col items-center gap-2"
                    >
                        <FiFileText size={20} /> Reports
                    </button>
                </div>
            </div>
         </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. MANAGE USERS */}
      {activeModal === 'users' && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl p-6 rounded-3xl shadow-2xl m-4 h-[80vh] flex flex-col">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">User Management</h3>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full"><FiX/></button>
               </div>
               <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                  <FiSearch className="text-slate-400"/>
                  <input type="text" placeholder="Search users..." className="bg-transparent outline-none w-full text-sm font-medium" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
               </div>
               <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 text-xs uppercase text-slate-400 sticky top-0"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead>
                     <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map(user => (
                           <tr key={user.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-sm text-slate-800">{user.name}<br/><span className="text-[10px] text-slate-400 font-normal">{user.email}</span></td>
                              <td className="p-3 text-xs font-bold text-slate-500">{user.role}</td>
                              <td className="p-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span></td>
                              <td className="p-3 text-right">
                                 <button onClick={() => toggleUserStatus(user.id)} className={`p-2 rounded-lg transition-colors ${user.status === 'Active' ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`} title="Toggle Status">{user.status === 'Active' ? <FiLock /> : <FiUnlock />}</button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      )}

      {/* 2. ALL LOGS */}
      {activeModal === 'logs' && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 w-full max-w-lg p-6 rounded-3xl shadow-2xl m-4 h-[70vh] flex flex-col text-white">
               <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold flex items-center gap-2"><FiActivity className="text-indigo-400"/> System Logs</h3><button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white/10 rounded-full"><FiX/></button></div>
               <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {[...Array(10)].map((_, i) => (
                     <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-xs font-mono text-slate-500">10:4{i} AM</span><div className="flex-1"><p className="text-sm font-bold">API Request Success</p><p className="text-xs text-slate-400">Endpoint: /api/v1/users</p></div><span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">200 OK</span></div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* 3. REPORTS (WORKING DOWNLOAD) */}
      {activeModal === 'reports' && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl m-4">
               <h3 className="text-xl font-bold text-slate-900 mb-2">Generate Reports</h3>
               <p className="text-sm text-slate-500 mb-6">Select report type to download.</p>
               <div className="space-y-3">
                  <button onClick={() => generateCSV('FINANCIAL')} className="w-full flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                     <div className="bg-green-100 text-green-600 p-2 rounded-lg"><FiDollarSign size={20}/></div>
                     <div className="text-left"><p className="font-bold text-slate-900 text-sm">Financial Report</p><p className="text-xs text-slate-400">Revenue, Refunds, Tax</p></div>
                  </button>
                  <button onClick={() => generateCSV('GROWTH')} className="w-full flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                     <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><FiUsers size={20}/></div>
                     <div className="text-left"><p className="font-bold text-slate-900 text-sm">User Growth</p><p className="text-xs text-slate-400">Signups, Active Users</p></div>
                  </button>
               </div>
               <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-3 text-slate-400 font-bold hover:text-slate-600">Close</button>
            </div>
         </div>
      )}

    </div>
  );
}