"use client";
import Link from "next/link"; // ✅ Link Import Added
import { COURSES } from "@/lib/data";
import CourseCard from "@/components/CourseCard";
import { FiPlus } from "react-icons/fi";

export default function TeacherCourses() {
  // Filter courses assuming logged in teacher is "Suresh Sir"
  const myCourses = COURSES.filter(c => c.instructor === "Suresh Sir");

  return (
    <div className="space-y-8">
      {/* Header with Action */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Courses</h1>
          <p className="text-slate-500 mt-2">Create new content and track student performance.</p>
        </div>
        
        {/* ✅ Updated: Wrapped Button in Link */}
        <Link href="/dashboard/teacher/create-course">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
            <FiPlus size={20} /> Create New Course
          </button>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <CourseCard key={course.id} course={course} role="teacher" />
        ))}
        
        {/* ✅ Updated: Empty State Card is also clickable now */}
        <Link href="/dashboard/teacher/create-course" className="contents">
            <button className="border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 transition-all min-h-[300px] group w-full">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                <FiPlus size={32} />
            </div>
            <span className="font-bold">Add New Course</span>
            </button>
        </Link>
      </div>
    </div>
  );
}