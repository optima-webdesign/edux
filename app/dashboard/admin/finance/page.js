"use client";
import { useState } from "react";
import { 
  FiTrendingUp, FiDownload, FiDollarSign, FiCreditCard, 
  FiArrowUpRight, FiArrowDownLeft, FiCalendar, FiFilter 
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// 🇮🇳 Utility to Format Indian Currency
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Mock Data
const REVENUE_DATA = [
  { name: "Mon", income: 45000, expense: 12000 },
  { name: "Tue", income: 32000, expense: 15000 },
  { name: "Wed", income: 55000, expense: 20000 },
  { name: "Thu", income: 48000, expense: 18000 },
  { name: "Fri", income: 62000, expense: 25000 },
  { name: "Sat", income: 85000, expense: 30000 },
  { name: "Sun", income: 95000, expense: 28000 },
];

const INDIAN_TRANSACTIONS = [
  { id: 1, user: "Aarav Patel", date: "2025-01-28", amount: 4999, status: "Success", method: "UPI" },
  { id: 2, user: "Priya Sharma", date: "2025-01-27", amount: 2499, status: "Pending", method: "NetBanking" },
  { id: 3, user: "Rahul Verma", date: "2025-01-24", amount: 12999, status: "Success", method: "Credit Card" },
  { id: 4, user: "Sneha Gupta", date: "2025-01-23", amount: 999, status: "Failed", method: "UPI" },
];

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState("Weekly");

  // ✅ LOGIC: CSV Download Function
  const downloadGSTReport = () => {
    // 1. CSV Headers Define karo
    const headers = ["Transaction ID", "User Name", "Date", "Method", "Status", "Total Amount (INR)", "Base Amount", "GST (18%)"];

    // 2. Data ko Rows mein convert karo (With GST Calculation)
    const rows = INDIAN_TRANSACTIONS.map(txn => {
      // Assuming Amount is GST Inclusive
      const baseAmount = (txn.amount / 1.18).toFixed(2);
      const gstAmount = (txn.amount - baseAmount).toFixed(2);

      return [
        txn.id,
        txn.user,
        txn.date,
        txn.method,
        txn.status,
        txn.amount,
        baseAmount,
        gstAmount
      ];
    });

    // 3. CSV Content join karo
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    // 4. File Download trigger karo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GST_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Overview 🇮🇳</h1>
          <p className="text-slate-500 mt-1">Track revenue, payouts, and UPI transactions.</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
                <FiCalendar /> {timeRange}
            </button>
            
            {/* ✅ UPDATED BUTTON: Added onClick handler */}
            <button 
                onClick={downloadGSTReport}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm shadow-lg active:scale-95"
            >
                <FiDownload /> Export GST Report
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiDollarSign size={80} className="text-indigo-600" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{formatINR(452000)}</h3>
            <div className="flex items-center gap-2 mt-4 text-sm font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-lg">
                <FiTrendingUp /> +18.2% <span className="text-slate-400 font-medium">vs last month</span>
            </div>
        </div>

        {/* Card 2: Net Profit */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiArrowUpRight size={80} className="text-green-600" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Net Profit</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{formatINR(315000)}</h3>
             <div className="flex items-center gap-2 mt-4 text-sm font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-lg">
                <FiArrowUpRight /> +8.5% <span className="text-slate-400 font-medium">Stable</span>
            </div>
        </div>

        {/* Card 3: Pending Payouts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiArrowDownLeft size={80} className="text-orange-600" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Pending Payouts</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">{formatINR(42500)}</h3>
            <div className="flex items-center gap-2 mt-4 text-sm font-bold text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-lg">
                <FiFilter /> 12 Requests <span className="text-slate-400 font-medium">Processing</span>
            </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Advanced Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <h3 className="font-bold text-xl text-slate-900">Revenue Analytics</h3>
                 <p className="text-slate-500 text-sm">Income vs Expenses (Last 7 Days)</p>
              </div>
              <div className="flex gap-4 text-sm font-bold">
                  <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Income
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span> Expense
                  </div>
              </div>
           </div>

           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={REVENUE_DATA}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
                       tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                       itemStyle={{ color: '#fff' }}
                       formatter={(value) => formatINR(value)}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#4f46e5" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                        name="Income" 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorExpense)" 
                        name="Expense" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Right: Indian Context Transactions */}
        <div className="space-y-6">
           
           {/* UPI / Bank Balance Card */}
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-xl">₹</span>
                     </div>
                     <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">HDFC Bank **** 8890</span>
                 </div>
                 
                 <p className="text-indigo-200 font-bold text-xs uppercase tracking-wider">Available Balance</p>
                 <h3 className="text-4xl font-black mt-2">{formatINR(1245000)}</h3>
                 <p className="text-slate-400 text-xs mt-4">* Updated just now via UPI</p>
              </div>
              {/* Decorative Indian Pattern */}
              <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
           </div>

           {/* Recent UPI Transactions */}
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-slate-900 font-bold text-lg">Recent Transactions</p>
                 <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              
              <div className="space-y-4">
                 {INDIAN_TRANSACTIONS.map((txn) => (
                    <div key={txn.id} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors -mx-2">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                             txn.status === 'Success' ? 'bg-green-100 text-green-600' : 
                             txn.status === 'Failed' ? 'bg-red-100 text-red-600' : 
                             'bg-orange-100 text-orange-600'
                          }`}>
                             {txn.method === 'UPI' ? '📱' : <FiCreditCard size={18} />}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{txn.user}</p>
                             <p className="text-xs text-slate-500 font-bold">{txn.date} • {txn.method}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="block text-sm font-black text-slate-900">{formatINR(txn.amount)}</span>
                          <span className={`text-[10px] font-bold uppercase ${
                             txn.status === 'Success' ? 'text-green-600' : 
                             txn.status === 'Failed' ? 'text-red-600' : 
                             'text-orange-500'
                          }`}>
                             {txn.status}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}