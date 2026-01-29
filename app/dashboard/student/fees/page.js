"use client";
import { useState, useEffect } from "react";
import { 
  FiDownload, FiCreditCard, FiAlertCircle, FiCheck, FiClock, 
  FiFileText, FiX, FiSmartphone, FiShield, FiLock, FiChevronRight 
} from "react-icons/fi";

// --- MOCK DATA (Indian Context) ---
const INITIAL_INVOICES = [
  { 
    id: "INV-2024-001", 
    title: "Semester 4 Tuition Fee", 
    date: "Jan 10, 2024", 
    dueDate: "Jan 25, 2024", 
    amount: 45000, 
    status: "Paid", 
    method: "UPI",
    items: ["Tuition Fee: ₹40,000", "Library Fee: ₹2,000", "Lab Charges: ₹3,000"]
  },
  { 
    id: "INV-2024-002", 
    title: "Hostel & Mess Charges", 
    date: "Feb 01, 2024", 
    dueDate: "Feb 15, 2024", 
    amount: 28500, 
    status: "Pending", 
    method: null,
    items: ["Hostel Rent: ₹15,000", "Mess Advance: ₹13,500"]
  },
  { 
    id: "INV-2024-003", 
    title: "Exam Registration Fee", 
    date: "Feb 20, 2024", 
    dueDate: "Feb 28, 2024", 
    amount: 2500, 
    status: "Overdue", 
    method: null,
    items: ["Exam Fee: ₹2,500"]
  }
];

// Utility: Format Currency
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function FeesPage() {
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [filter, setFilter] = useState("All");
  
  // Payment Modal States
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // 'UPI' | 'CARD'
  const [paymentStep, setPaymentStep] = useState("input"); // 'input' | 'processing' | 'success'
  const [isDownloading, setIsDownloading] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Timer Logic
  useEffect(() => {
    if (paymentModalOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paymentModalOpen, timeLeft]);

  // Generate QR Code on Invoice Selection
  useEffect(() => {
    if (selectedInvoice) {
        // --- REAL UPI STRING GENERATION ---
        // Format: upi://pay?pa=[UPI_ID]&pn=[NAME]&am=[AMOUNT]&cu=INR
        const upiString = `upi://pay?pa=edunexus-fees@sbi&pn=EduNexus Institute&am=${selectedInvoice.amount}&cu=INR`;
        
        // Encode for API
        const encodedApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;
        setQrCodeUrl(encodedApiUrl);
    }
  }, [selectedInvoice]);

  // Format Timer (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const initiatePayment = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentModalOpen(true);
    setPaymentStep("input");
    setTimeLeft(600); // Reset timer
  };

  const confirmPayment = () => {
    setPaymentStep("processing");
    
    // Simulate Gateway Delay
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id ? { ...inv, status: "Paid", method: paymentMethod } : inv
      ));
      setPaymentStep("success");
    }, 3000);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentStep("input");
  };

  // --- DOWNLOAD RECEIPT ---
  const downloadReceipt = (invoice) => {
    setIsDownloading(invoice.id);
    setTimeout(() => {
        const receiptContent = `
OFFICIAL FEE RECEIPT - EDUNEXUS
--------------------------------
Transaction ID: TXN-${Math.floor(Math.random()*10000000)}
Date: ${new Date().toLocaleDateString()}
Paid By: Arjun Mehta
--------------------------------
Invoice: ${invoice.title}
Amount Paid: ${formatINR(invoice.amount)}
Payment Mode: ${invoice.method || "Online"}
Status: SUCCESSFUL
--------------------------------
This is a computer generated receipt.
        `;
        const blob = new Blob([receiptContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Receipt_${invoice.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsDownloading(null);
    }, 1500);
  };

  // Derived Data
  const filteredInvoices = invoices.filter(inv => filter === "All" || inv.status === filter);
  const totalDue = invoices.reduce((acc, curr) => (curr.status !== 'Paid' ? acc + curr.amount : acc), 0);

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-20 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Fees & Payments</h1>
          <p className="text-slate-500 mt-2">Secure payments powered by EduNexus Gateway.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Outstanding</p>
            <h3 className="text-4xl font-extrabold">{formatINR(totalDue)}</h3>
            <p className="text-xs text-orange-400 mt-3 font-medium flex items-center gap-1"><FiAlertCircle/> Due Date: Feb 15</p>
         </div>
      </div>

      {/* INVOICE TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-wrap gap-2">
            {["All", "Pending", "Paid", "Overdue"].map(tab => (
                <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === tab ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>{tab}</button>
            ))}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-xs uppercase text-slate-400">
                <tr><th className="p-5">Invoice Details</th><th className="p-5">Due Date</th><th className="p-5">Amount</th><th className="p-5">Status</th><th className="p-5 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
                {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 font-bold text-slate-700">{inv.title}<br/><span className="text-xs font-normal text-slate-400">{inv.id}</span></td>
                    <td className="p-5 text-slate-500">{inv.dueDate}</td>
                    <td className="p-5 font-bold">{formatINR(inv.amount)}</td>
                    <td className="p-5"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{inv.status}</span></td>
                    <td className="p-5 text-right">
                        {inv.status === 'Paid' ? (
                            <button onClick={() => downloadReceipt(inv)} disabled={isDownloading === inv.id} className="text-indigo-600 font-bold text-xs flex items-center gap-1 ml-auto disabled:opacity-50">{isDownloading === inv.id ? "..." : <><FiDownload/> Receipt</>}</button>
                        ) : (
                            <button onClick={() => initiatePayment(inv)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2 ml-auto"><FiCreditCard/> Pay Now</button>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* --- REALISTIC PAYMENT MODAL --- */}
      {paymentModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
                
                {/* 1. Gateway Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">E</div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">EduNexus Gateway</h3>
                            <p className="text-[10px] text-green-600 flex items-center gap-1"><FiLock size={10}/> 100% Secure Transaction</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Expires In</p>
                        <p className="text-sm font-mono font-bold text-red-500">{formatTime(timeLeft)}</p>
                    </div>
                </div>

                {/* 2. Amount Banner */}
                <div className="bg-indigo-600 text-white p-6 text-center shrink-0 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xs font-medium text-indigo-200 mb-1">Paying to EduNexus Institute</p>
                        <h2 className="text-3xl font-extrabold">{formatINR(selectedInvoice.amount)}</h2>
                        <p className="text-xs text-indigo-200 mt-1">{selectedInvoice.title}</p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                </div>

                {/* 3. Main Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    
                    {paymentStep === 'input' && (
                        <div className="space-y-6">
                            
                            {/* Method Tabs */}
                            <div className="flex bg-slate-200 p-1 rounded-xl">
                                <button onClick={() => setPaymentMethod("UPI")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${paymentMethod === 'UPI' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    <FiSmartphone size={14} /> UPI / QR
                                </button>
                                <button onClick={() => setPaymentMethod("CARD")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${paymentMethod === 'CARD' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    <FiCreditCard size={14} /> Card
                                </button>
                            </div>

                            {/* --- UPI VIEW (REAL QR) --- */}
                            {paymentMethod === 'UPI' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                                        <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Scan with GPay / PhonePe</p>
                                        
                                        {/* REAL DYNAMIC QR CODE */}
                                        <div className="w-56 h-56 bg-white border-2 border-slate-100 rounded-2xl p-2 mb-4 relative group shadow-sm">
                                            {/* API generates QR based on amount */}
                                            <img 
                                                src={qrCodeUrl}
                                                alt="Payment QR"
                                                className="w-full h-full object-contain"
                                            />
                                            {/* Logo Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="bg-white p-1.5 rounded-full shadow-md border border-slate-100">
                                                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">₹</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-4 grayscale opacity-70">
                                            <span className="font-bold text-slate-500 text-xs">Google Pay</span>
                                            <span className="font-bold text-slate-500 text-xs">PhonePe</span>
                                            <span className="font-bold text-slate-500 text-xs">Paytm</span>
                                            <span className="font-bold text-slate-500 text-xs">BHIM</span>
                                        </div>
                                    </div>
                                    
                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-slate-300"></div>
                                        <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400">OR ENTER UPI ID</span>
                                        <div className="flex-grow border-t border-slate-300"></div>
                                    </div>

                                    <div className="flex gap-2">
                                        <input type="text" placeholder="username@oksbi" className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
                                        <button className="bg-slate-200 text-slate-600 font-bold px-4 rounded-xl text-sm hover:bg-slate-300">Verify</button>
                                    </div>
                                </div>
                            )}

                            {/* --- CARD VIEW (REALISTIC) --- */}
                            {paymentMethod === 'CARD' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    
                                    {/* Virtual Card Visualization */}
                                    <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between transform transition-all hover:scale-[1.02]">
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-8 bg-yellow-500/20 rounded flex items-center justify-center gap-1">
                                                <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-80"></div>
                                                <div className="w-4 h-4 bg-orange-500 rounded-full opacity-80 -ml-2"></div>
                                            </div>
                                            <span className="text-xs font-mono opacity-60">DEBIT / CREDIT</span>
                                        </div>
                                        <div className="text-xl font-mono tracking-widest mt-4">
                                            4242 •••• •••• 9812
                                        </div>
                                        <div className="flex justify-between items-end mt-4">
                                            <div>
                                                <p className="text-[9px] uppercase opacity-60 mb-1">Card Holder</p>
                                                <p className="text-sm font-bold tracking-wide uppercase">Arjun Mehta</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase opacity-60 mb-1">Expires</p>
                                                <p className="text-sm font-bold tracking-wide">12/28</p>
                                            </div>
                                        </div>
                                        {/* Shine Effect */}
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* Card Form */}
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Card Number</label>
                                            <div className="relative">
                                                <FiCreditCard className="absolute left-4 top-3.5 text-slate-400" />
                                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm font-bold tracking-wide focus:outline-none focus:border-indigo-600 transition-all focus:shadow-sm" />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Expiry</label>
                                                <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600 text-center" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">CVV</label>
                                                <div className="relative">
                                                    <FiLock className="absolute left-4 top-3.5 text-slate-400" size={14} />
                                                    <input type="password" placeholder="123" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- PROCESSING STATE --- */}
                    {paymentStep === 'processing' && (
                        <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in zoom-in">
                            <div className="relative w-24 h-24 mb-6">
                                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FiShield className="text-indigo-600" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Processing Payment...</h3>
                            <p className="text-sm text-slate-500 mt-2">Please do not close this window or press back.</p>
                            <div className="mt-6 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg text-xs font-bold border border-yellow-100">
                                Contacting Bank Server...
                            </div>
                        </div>
                    )}

                    {/* --- SUCCESS STATE --- */}
                    {paymentStep === 'success' && (
                        <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in zoom-in">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                                <FiCheck size={48} className="animate-bounce" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h3>
                            <p className="text-slate-500 mt-2">Transaction ID: TXN-{Math.floor(Math.random()*1000000)}</p>
                            <p className="text-sm text-slate-400 mt-1">A receipt has been sent to your email.</p>
                        </div>
                    )}

                </div>

                {/* 4. Footer Buttons */}
                <div className="p-6 border-t border-slate-200 bg-white shrink-0">
                    {paymentStep === 'input' && (
                        <button 
                            onClick={confirmPayment}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-300 hover:bg-slate-800 transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            {paymentMethod === 'UPI' ? 'Verify & Pay' : 'Pay Securely'} {formatINR(selectedInvoice.amount)}
                            <FiChevronRight />
                        </button>
                    )}
                    {paymentStep === 'success' && (
                        <button 
                            onClick={closePaymentModal}
                            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-200 hover:bg-green-700 transition-transform active:scale-95"
                        >
                            Done
                        </button>
                    )}
                </div>

            </div>
        </div>
      )}

    </div>
  );
}