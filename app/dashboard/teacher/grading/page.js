"use client";
import { useState } from "react";
import { SUBMISSIONS } from "@/lib/data";
import { FiDownload, FiSave, FiCheck, FiFilter } from "react-icons/fi";

export default function GradingConsole() {
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [editingId, setEditingId] = useState(null);
  const [tempGrade, setTempGrade] = useState("");

  // Start Editing
  const handleEdit = (sub) => {
    setEditingId(sub.id);
    setTempGrade(sub.grade || "");
  };

  // Save Grade
  const handleSave = (id) => {
    setSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, grade: tempGrade, status: "Graded" } : s
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Grading Console</h1>
          <p className="text-slate-500 mt-2">Review student submissions and assign marks.</p>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-600">
           <FiFilter /> Filter: All Assignments
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Student</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Assignment</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">File</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Grade (100)</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {submissions.map((sub) => (
              <tr key={sub.id} className={`hover:bg-slate-50 transition-colors ${editingId === sub.id ? 'bg-indigo-50/50' : ''}`}>
                <td className="p-4 font-bold text-slate-900">{sub.student}</td>
                <td className="p-4 text-sm text-slate-600">{sub.assignment}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold ${
                      sub.status === 'Graded' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                   }`}>
                      {sub.status}
                   </span>
                </td>
                <td className="p-4">
                   <button className="flex items-center gap-2 text-indigo-600 text-sm font-bold hover:underline">
                      <FiDownload /> {sub.file}
                   </button>
                </td>
                <td className="p-4">
                   {editingId === sub.id ? (
                      <input 
                        type="number" 
                        className="w-16 p-1 border border-indigo-300 rounded text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={tempGrade}
                        onChange={(e) => setTempGrade(e.target.value)}
                        autoFocus
                      />
                   ) : (
                      <span className="font-bold text-slate-700">{sub.grade || "-"}</span>
                   )}
                </td>
                <td className="p-4 text-right">
                   {editingId === sub.id ? (
                      <button 
                        onClick={() => handleSave(sub.id)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors flex items-center gap-1 ml-auto"
                      >
                         <FiSave /> Save
                      </button>
                   ) : (
                      <button 
                        onClick={() => handleEdit(sub)}
                        className="text-slate-400 hover:text-indigo-600 font-bold text-xs border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all"
                      >
                         Grade
                      </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}