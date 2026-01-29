"use client";
import { useState } from "react";
import { INVOICES } from "@/lib/data";
import { FiDownload, FiCreditCard, FiAlertCircle, FiCheck, FiClock } from "react-icons/fi";

export default function ParentFeesPage() {
  const [invoices, setInvoices] = useState(INVOICES);
  const [processingId, setProcessingId] = useState(null);

  // Fake Payment Logic
  const handlePay = (id) => {
    if(!confirm("Proceed to Payment Gateway for your child?")) return;
    
    setProcessingId(id);
    // Simulate API Call
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        inv.id === id ? { ...inv, status: "Paid", method: "Net Banking" } : inv
      ));
      setProcessingId(null);
      alert("Payment Successful! Receipt sent to your email. ✅");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Fee Payment</h1>
        <p className="text-slate-500 mt-2">Manage tuition fees and download receipts for Rahul.</p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-indigo-200 font-medium text-sm mb-1">Total Outstanding</p>
                <h3 className="text-4xl font-bold">$450.00</h3>
                <p className="text-xs text-indigo-300 mt-2">Due by 30th Oct</p>
            </div>
            <FiCreditCard className="absolute right-[-20px] bottom-[-20px] text-indigo-800 text-9xl opacity-20" />
         </div>

         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500 font-bold text-xs uppercase mb-2">Payment History</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
               2 Paid
            </h3>
            <p className="text-sm text-green-600 font-bold mt-1">No late penalties</p>
         </div>

         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
             <p className="text-slate-500 font-bold text-xs uppercase mb-2">Next Invoice</p>
             <h3 className="text-2xl font-bold text-slate-800">Nov 01</h3>
             <p className="text-sm text-slate-400 mt-1">Semester 2 Fee ($1,200)</p>
         </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-700">Invoice History</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-white border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Description</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Date</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Amount</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-4">
                   <p className="font-bold text-slate-900">{inv.title}</p>
                   <p className="text-xs text-slate-500 font-mono">{inv.id}</p>
                </td>
                <td className="p-4 text-sm text-slate-600 font-medium">
                   {inv.date}
                </td>
                <td className="p-4 font-bold text-slate-800">
                   {inv.amount}
                </td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-fit ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      inv.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                   }`}>
                      {inv.status === 'Paid' ? <FiCheck /> : <FiClock />}
                      {inv.status}
                   </span>
                </td>
                <td className="p-4 text-right">
                   {inv.status === 'Paid' ? (
                      <button className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 ml-auto text-sm font-bold transition-colors">
                         <FiDownload /> Download
                      </button>
                   ) : (
                      <button 
                        onClick={() => handlePay(inv.id)}
                        disabled={processingId === inv.id}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-md ml-auto flex items-center gap-2"
                      >
                         {processingId === inv.id ? (
                            <span className="animate-pulse">Processing...</span>
                         ) : (
                            <><FiCreditCard /> Pay Now</>
                         )}
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