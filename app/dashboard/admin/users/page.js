"use client";
import { useState, useMemo } from "react";
import { 
  FiSearch, FiTrash2, FiEdit2, FiUserPlus, FiFilter, 
  FiDownload, FiCheck, FiX, FiChevronLeft, FiChevronRight, 
  FiUploadCloud, FiFileText, FiAlertCircle, FiEye 
} from "react-icons/fi";

// --- MOCK DATA (With Specific Docs) ---
const INITIAL_USERS = [
  { 
    id: 1, name: "Rahul Verma", email: "rahul@gmail.com", role: "Student", status: "Active", joinDate: "2024-01-10", 
    documents: { aadhar: "aadhar_rahul.pdf", lc: "lc_rahul.jpg", marksheet: null } 
  },
  { 
    id: 2, name: "Suresh Sir", email: "suresh@edunexus.com", role: "Teacher", status: "Active", joinDate: "2023-12-05", 
    documents: { aadhar: "aadhar_suresh.pdf", lc: null, marksheet: "phd_cert.pdf" } 
  },
  { 
    id: 3, name: "Amit Kumar", email: "amit.k@yahoo.com", role: "Student", status: "Inactive", joinDate: "2024-02-15", 
    documents: { aadhar: null, lc: null, marksheet: null } 
  },
];

// Document Fields Config
const DOC_TYPES = [
  { key: "aadhar", label: "Aadhar Card" },
  { key: "lc", label: "Leaving Certificate" },
  { key: "marksheet", label: "10th Marksheet" }
];

export default function UserManagement() {
  // --- STATES ---
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  
  // Modal States
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  // File Upload State (Object to hold multiple files)
  const [uploadData, setUploadData] = useState({}); 

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- ACTIONS ---

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- FILE HANDLING LOGIC (Field Wise) ---
  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData(prev => ({ ...prev, [key]: file }));
    }
  };

  const removeFile = (key) => {
    setUploadData(prev => {
        const newData = { ...prev };
        delete newData[key]; // Remove file from staging
        return newData;
    });
  };

  // --- SAVE USER ---
  const handleSaveUser = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const formData = new FormData(e.target);
    
    // Merge Old Docs with New Uploads
    const updatedDocs = { 
        aadhar: uploadData.aadhar ? uploadData.aadhar.name : (currentUser?.documents?.aadhar || null),
        lc: uploadData.lc ? uploadData.lc.name : (currentUser?.documents?.lc || null),
        marksheet: uploadData.marksheet ? uploadData.marksheet.name : (currentUser?.documents?.marksheet || null),
    };

    const newUser = {
      id: currentUser ? currentUser.id : Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      status: formData.get("status"),
      joinDate: currentUser ? currentUser.joinDate : new Date().toISOString().split('T')[0],
      documents: updatedDocs
    };

    setTimeout(() => {
      if (currentUser) {
        setUsers(users.map(u => u.id === currentUser.id ? newUser : u));
        showToast("User Documents Updated! 📂");
      } else {
        setUsers([newUser, ...users]);
        showToast("New User Added Successfully! 🎉");
      }
      setIsProcessing(false);
      setIsModalOpen(false);
      setCurrentUser(null);
      setUploadData({});
    }, 1500);
  };

  // --- HELPER ACTIONS ---
  const handleDelete = (id) => {
    if (confirm("Delete User?")) setUsers(users.filter(u => u.id !== id));
  };

  const openModal = (user = null) => {
    setCurrentUser(user);
    setUploadData({}); // Reset uploads
    setIsModalOpen(true);
  };

  // --- FILTER LOGIC ---
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans text-slate-900 pb-20 relative">
      
      {/* --- TOAST --- */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-3 rounded-xl shadow-2xl text-white font-bold animate-in slide-in-from-top-5 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
           {toast.msg}
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Manage users and specific document uploads.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg text-sm">
            <FiUserPlus /> Add User
        </button>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
           <FiSearch className="text-slate-400" />
           <input type="text" placeholder="Search users..." className="bg-transparent outline-none w-full text-sm font-medium" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 rounded-xl px-4 py-2.5 outline-none cursor-pointer" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
             <option value="All">All Roles</option><option value="Student">Student</option><option value="Teacher">Teacher</option>
        </select>
      </div>

      {/* --- TABLE (Showing Document Status) --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Documents Status</th>
                <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
                {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{user.name}<br/><span className="text-[10px] text-slate-400 font-normal">{user.email}</span></td>
                    <td className="p-4"><span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">{user.role}</span></td>
                    
                    {/* DOCUMENT STATUS CHIPS */}
                    <td className="p-4">
                        <div className="flex gap-2 flex-wrap">
                            {DOC_TYPES.map(doc => (
                                <span key={doc.key} className={`text-[10px] font-bold px-2 py-1 rounded border flex items-center gap-1 ${user.documents[doc.key] ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-400 border-red-100 opacity-60'}`}>
                                    {user.documents[doc.key] ? <FiCheck size={10}/> : <FiX size={10}/>} {doc.label.split(" ")[0]}
                                </span>
                            ))}
                        </div>
                    </td>

                    <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                            <button onClick={() => openModal(user)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><FiEdit2 /></button>
                            <button onClick={() => handleDelete(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* --- ADD / EDIT USER MODAL (Field Wise Upload) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl p-6 rounded-3xl shadow-2xl m-4 animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">{currentUser ? "Edit User & Docs" : "Add New User"}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500"><FiX size={20}/></button>
                </div>
                
                <form onSubmit={handleSaveUser} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Name</label>
                            <input type="text" name="name" defaultValue={currentUser?.name} required className="w-full border border-slate-200 p-2.5 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email</label>
                            <input type="email" name="email" defaultValue={currentUser?.email} required className="w-full border border-slate-200 p-2.5 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Role</label>
                            <select name="role" defaultValue={currentUser?.role || "Student"} className="w-full border border-slate-200 p-2.5 rounded-xl font-medium bg-white">
                                <option>Student</option><option>Teacher</option><option>Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Status</label>
                            <select name="status" defaultValue={currentUser?.status || "Active"} className="w-full border border-slate-200 p-2.5 rounded-xl font-medium bg-white">
                                <option>Active</option><option>Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 my-4"></div>

                    {/* --- FIELD WISE DOCUMENT UPLOAD --- */}
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><FiUploadCloud className="text-indigo-600"/> Upload Documents</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {DOC_TYPES.map((doc) => (
                            <div key={doc.key} className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase block">{doc.label}</label>
                                
                                <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors relative h-32 flex flex-col items-center justify-center ${
                                    (uploadData[doc.key] || currentUser?.documents?.[doc.key]) 
                                    ? "border-green-400 bg-green-50" 
                                    : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                                }`}>
                                    
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileChange(doc.key, e)}
                                    />

                                    {(uploadData[doc.key] || currentUser?.documents?.[doc.key]) ? (
                                        <div className="text-green-700">
                                            <FiCheck className="mx-auto mb-1 text-xl" />
                                            <p className="text-[10px] font-bold truncate max-w-[100px]">
                                                {uploadData[doc.key]?.name || currentUser?.documents?.[doc.key]}
                                            </p>
                                            <button 
                                                type="button"
                                                onClick={(e) => {e.stopPropagation(); removeFile(doc.key)}} // This only removes new file
                                                className="text-[10px] text-red-500 underline mt-1 relative z-10"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-slate-400">
                                            <FiUploadCloud className="mx-auto mb-1 text-xl" />
                                            <p className="text-[10px] font-bold">Click to Upload</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="submit" disabled={isProcessing} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70">
                        {isProcessing ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}