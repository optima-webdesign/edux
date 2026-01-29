import { FiTrendingUp, FiTrendingDown, FiUsers, FiDollarSign, FiBook, FiCheckCircle, FiClock } from "react-icons/fi";

const icons = {
  money: FiDollarSign,
  users: FiUsers,
  course: FiBook,
  check: FiCheckCircle,
  time: FiClock,
  task: FiTrendingUp
};

export default function StatsCard({ label, value, change, type }) {
  const Icon = icons[type] || FiTrendingUp;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
          <Icon />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
          change.includes("+") ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}