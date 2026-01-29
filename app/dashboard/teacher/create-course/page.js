"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiX, FiVideo, FiPlus, FiTrash2, FiSave, FiCheck } from "react-icons/fi";

export default function CreateCourse() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form State
  const [form, setForm] = useState({
    title: "",
    category: "Development",
    description: "",
    sections: [{ id: 1, title: "Introduction", lessons: [] }]
  });

  // Upload Simulation
  const handlePublish = () => {
    setUploading(true);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 10;
      setProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          alert("Course Published Successfully! 🎉");
          router.push("/dashboard/teacher/courses");
        }, 800);
      }
    }, 400); // Speed of upload simulation
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { id: Date.now(), title: "New Section", lessons: [] }]
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create New Course</h1>
          <p className="text-slate-500">Step {step} of 2</p>
        </div>
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <FiX size={24} className="text-slate-500" />
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Progress Steps Top Bar */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
           <div className={`flex-1 p-4 text-center font-bold text-sm border-b-2 ${step === 1 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}>
              1. Course Details
           </div>
           <div className={`flex-1 p-4 text-center font-bold text-sm border-b-2 ${step === 2 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}>
              2. Curriculum & Media
           </div>
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
           
           {/* STEP 1: Basic Info */}
           {step === 1 && (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Course Title</label>
                   <input 
                     type="text" 
                     placeholder="e.g. Master Next.js 14"
                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                     value={form.title}
                     onChange={(e) => setForm({...form, title: e.target.value})}
                   />
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select 
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none"
                        value={form.category}
                        onChange={(e) => setForm({...form, category: e.target.value})}
                      >
                         <option>Development</option>
                         <option>Design</option>
                         <option>Business</option>
                         <option>Marketing</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Level</label>
                      <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none">
                         <option>Beginner</option>
                         <option>Intermediate</option>
                         <option>Advanced</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Description</label>
                   <textarea 
                     rows="5"
                     placeholder="What will students learn in this course?"
                     className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                   ></textarea>
                </div>
             </div>
           )}

           {/* STEP 2: Upload */}
           {step === 2 && (
             <div className="space-y-8 animate-in slide-in-from-right duration-300">
                {!uploading ? (
                   <>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center border-dashed border-2">
                         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-600">
                            <FiUploadCloud size={32} />
                         </div>
                         <h3 className="font-bold text-indigo-900 text-lg">Upload Course Thumbnail</h3>
                         <p className="text-indigo-600/70 text-sm mt-1">Drag and drop or click to browse</p>
                      </div>

                      <div className="space-y-4">
                         <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <FiVideo /> Course Curriculum
                         </h3>
                         
                         {form.sections.map((section, idx) => (
                            <div key={section.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                               <div className="flex justify-between items-center mb-2">
                                  <span className="font-bold text-slate-700">Section {idx + 1}: {section.title}</span>
                                  <button className="text-slate-400 hover:text-red-500"><FiTrash2 /></button>
                               </div>
                               <button className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                  <FiPlus /> Add Lesson Video
                               </button>
                            </div>
                         ))}

                         <button 
                           onClick={addSection}
                           className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl font-bold text-slate-400 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                         >
                            + Add New Section
                         </button>
                      </div>
                   </>
                ) : (
                   <div className="text-center py-10">
                      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                         <FiUploadCloud size={40} className="text-indigo-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Publishing Course...</h2>
                      <p className="text-slate-500 mb-8">Please wait while we upload your high-quality content.</p>
                      
                      <div className="max-w-md mx-auto relative pt-1">
                         <div className="flex mb-2 items-center justify-between">
                            <div>
                               <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                  Uploading
                               </span>
                            </div>
                            <div className="text-right">
                               <span className="text-xs font-semibold inline-block text-indigo-600">
                                  {progress}%
                               </span>
                            </div>
                         </div>
                         <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"></div>
                         </div>
                      </div>
                   </div>
                )}
             </div>
           )}

        </div>

        {/* Footer Buttons */}
        {!uploading && (
          <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between">
             {step === 1 ? (
                <button disabled className="text-slate-300 font-bold cursor-not-allowed">Back</button>
             ) : (
                <button onClick={() => setStep(1)} className="text-slate-600 font-bold hover:text-slate-900">Back</button>
             )}

             {step === 1 ? (
                <button 
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
                >
                  Next Step
                </button>
             ) : (
                <button 
                  onClick={handlePublish}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all"
                >
                  <FiCheck /> Publish Course
                </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
}