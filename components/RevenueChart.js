"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 6890 },
  { name: "Sat", revenue: 8390 },
  { name: "Sun", revenue: 10490 },
];

export default function RevenueChart() {
  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
           <p className="text-sm text-slate-500">Income over the last 7 days</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-lg px-3 py-2 outline-none">
           <option>Last 7 Days</option>
           <option>Last Month</option>
           <option>Last Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%" className="!h-[300px]">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
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
            tickFormatter={(value) => `$${value/1000}k`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            activeDot={{ r: 8, strokeWidth: 0, fill: '#4338ca' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}