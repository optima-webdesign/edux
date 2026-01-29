import Link from "next/link";
import { FiBook, FiUsers, FiClock, FiPlayCircle, FiMoreHorizontal } from "react-icons/fi";

export default function CourseCard({ course, role }) {
  const isTeacher = role === "teacher";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Thumbnail Area */}
      <div className="h-40 bg-slate-100 relative flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          course.category === 'Design' ? 'from-purple-500 to-pink-500' : 
          course.category === 'Marketing' ? 'from-orange-400 to-red-500' : 
          'from-blue-500 to-indigo-600'
        } opacity-10 group-hover:opacity-20 transition-opacity`}></div>
        
        <h2 className="text-3xl font-black text-slate-300 tracking-widest select-none">{course.thumbnail}</h2>
        
        {isTeacher && (
          <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded ${
            course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {course.status}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wider">
            {course.category}
          </span>
          <button className="text-slate-400 hover:text-slate-600">
            <FiMoreHorizontal />
          </button>
        </div>

        <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
          <FiBook className="inline" /> {course.lessons} Lessons
          {!isTeacher && <span>• By {course.instructor}</span>}
        </p>

        {/* Role Specific Footer */}
        {isTeacher ? (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm text-slate-600">
            <span className="flex items-center gap-1"><FiUsers /> {course.students} Students</span>
            <Link href={`/dashboard/teacher/courses/${course.id}`} className="font-bold text-indigo-600 hover:underline">
              Manage
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold">{course.progress}% Complete</span>
              <Link href={`/dashboard/student/courses/${course.id}`}>
                <button className="flex items-center gap-2 text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                  <FiPlayCircle /> Continue
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}