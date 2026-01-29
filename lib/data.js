export const USERS = {
  admin: { 
    name: "Vikram Admin", 
    email: "admin@edu.com", 
    role: "admin", 
    avatar: "https://i.pravatar.cc/150?u=admin",
    password: "123" 
  },
  teacher: { 
    name: "Suresh Sir", 
    email: "teacher@edu.com", 
    role: "teacher", 
    avatar: "https://i.pravatar.cc/150?u=teacher",
    password: "123" 
  },
  student: { 
    name: "Rahul Kumar", 
    email: "student@edu.com", 
    role: "student", 
    avatar: "https://i.pravatar.cc/150?u=student",
    password: "123" 
  },
  parent: { 
    name: "Mr. Sharma", 
    email: "parent@edu.com", 
    role: "parent", 
    avatar: "https://i.pravatar.cc/150?u=parent",
    password: "123" 
  }
};

export const DASHBOARD_STATS = {
  admin: [
    { label: "Total Revenue", value: "$45,200", change: "+12%", type: "money" },
    { label: "Active Users", value: "1,240", change: "+5%", type: "users" },
    { label: "Total Courses", value: "45", change: "0%", type: "course" }
  ],
  teacher: [
    { label: "My Students", value: "120", change: "+2 New", type: "users" },
    { label: "Assignments", value: "12 Pending", change: "Urgent", type: "task" },
    { label: "Avg. Grade", value: "88%", change: "+3%", type: "grade" }
  ],
  student: [
    { label: "Courses Enrolled", value: "4", change: "Active", type: "course" },
    { label: "Attendance", value: "92%", change: "Good", type: "check" },
    { label: "Next Assignment", value: "2 Days", change: "Due", type: "time" }
  ],
  // ✅ Parent Stats Added
  parent: [
    { label: "Child's Attendance", value: "92%", change: "Good", type: "check" },
    { label: "Pending Fees", value: "$450", change: "Due Oct 30", type: "money" },
    { label: "Avg. Test Score", value: "85/100", change: "+5%", type: "grade" }
  ]
};

export const COURSES = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Suresh Sir",
    thumbnail: "REACT",
    students: 120,
    lessons: 24,
    progress: 0,
    category: "Development",
    status: "Published"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Suresh Sir",
    thumbnail: "DESIGN",
    students: 85,
    lessons: 18,
    progress: 45,
    category: "Design",
    status: "Published"
  },
  {
    id: 3,
    title: "Node.js Backend Architecture",
    instructor: "Suresh Sir",
    thumbnail: "NODE",
    students: 200,
    lessons: 40,
    progress: 10,
    category: "Development",
    status: "Draft"
  },
  {
    id: 4,
    title: "Digital Marketing 101",
    instructor: "Anita Mam",
    thumbnail: "MKTG",
    students: 50,
    lessons: 12,
    progress: 90,
    category: "Marketing",
    status: "Published"
  }
];

export const COURSE_CONTENTS = {
  1: { 
    description: "Deep dive into HOCs, Render Props, and Custom Hooks to build scalable apps.",
    modules: [
      {
        title: "Section 1: Introduction",
        lessons: [
          { id: 101, title: "Welcome to the Course", duration: "2:30", type: "video", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
          { id: 102, title: "Environment Setup", duration: "10:15", type: "video", url: "https://www.youtube.com/embed/dGcsHMXbSOA" }
        ]
      },
      {
        title: "Section 2: Advanced Hooks",
        lessons: [
          { id: 103, title: "useMemo & useCallback", duration: "15:00", type: "video", url: "https://www.youtube.com/embed/vpE9I_eqHdM" },
          { id: 104, title: "Custom Hooks Logic", duration: "12:45", type: "video", locked: true },
          { id: 105, title: "Assignment: Build a Timer", duration: "45:00", type: "quiz", locked: true }
        ]
      }
    ]
  }
};

export const LIVE_CHAT_MESSAGES = [
  { id: 1, user: "Rahul Kumar", text: "Good morning sir! 👋", time: "10:00 AM" },
  { id: 2, user: "Priya Singh", text: "Voice is clear now.", time: "10:02 AM" },
  { id: 3, user: "Amit Verma", text: "Sir, can you zoom in a bit?", time: "10:05 AM" },
  { id: 4, user: "Suresh Sir", text: "Sure, let me share my screen.", time: "10:06 AM", isTeacher: true },
];

export const ADMIN_USERS_LIST = [
  { id: 1, name: "Rahul Kumar", email: "student@edu.com", role: "student", status: "Active", lastLogin: "2 mins ago" },
  { id: 2, name: "Suresh Sir", email: "teacher@edu.com", role: "teacher", status: "Active", lastLogin: "1 hour ago" },
  { id: 3, name: "Vikram Admin", email: "admin@edu.com", role: "admin", status: "Active", lastLogin: "Now" },
  { id: 4, name: "Priya Sharma", email: "parent@edu.com", role: "parent", status: "Active", lastLogin: "3 days ago" }, // Added Parent to User List
  { id: 5, name: "Amit Verma", email: "amit@edu.com", role: "student", status: "Suspended", lastLogin: "1 week ago" },
];

export const TRANSACTIONS = [
  { id: "TXN_101", user: "Rahul Kumar", item: "Pro Plan (Yearly)", amount: "$120.00", date: "Oct 24, 2025", status: "Success" },
  { id: "TXN_102", user: "Priya Sharma", item: "UI/UX Course", amount: "$45.00", date: "Oct 22, 2025", status: "Success" },
  { id: "TXN_103", user: "Amit Verma", item: "Late Fee", amount: "$10.00", date: "Oct 20, 2025", status: "Failed" },
  { id: "TXN_104", user: "Suresh Sir", item: "Payout", amount: "$850.00", date: "Oct 15, 2025", status: "Processing" },
];

export const ASSIGNMENTS = [
  { id: 1, title: "React Lifecycle Methods", course: "Advanced React Patterns", dueDate: "Oct 25, 2025", status: "Pending", marks: 100, grade: null, feedback: null },
  { id: 2, title: "Wireframe for E-Commerce", course: "UI/UX Design Masterclass", dueDate: "Oct 20, 2025", status: "Submitted", marks: 50, grade: null, feedback: "Pending Review" },
  { id: 3, title: "Marketing Case Study", course: "Digital Marketing 101", dueDate: "Oct 15, 2025", status: "Graded", marks: 20, grade: 18, feedback: "Excellent analysis, keep it up!" }
];

export const SUBMISSIONS = [
  { id: 101, student: "Rahul Kumar", assignment: "React Lifecycle", file: "lifecycle.pdf", date: "Oct 24", status: "Pending", grade: "" },
  { id: 102, student: "Priya Sharma", assignment: "React Lifecycle", file: "react-app.zip", date: "Oct 23", status: "Graded", grade: "92" },
  { id: 103, student: "Amit Verma", assignment: "UI/UX Wireframe", file: "design.fig", date: "Oct 25", status: "Pending", grade: "" },
];

export const CLASS_LIST = [
  { id: 101, name: "Rahul Kumar", roll: "CS-01", status: "Present", avatar: "https://i.pravatar.cc/150?u=student" },
  { id: 102, name: "Priya Sharma", roll: "CS-02", status: "Absent", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 103, name: "Amit Verma", roll: "CS-03", status: "Present", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 104, name: "Neha Gupta", roll: "CS-04", status: "Late", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 105, name: "Arjun Reddy", roll: "CS-05", status: "Present", avatar: "https://i.pravatar.cc/150?u=5" },
];

export const INVOICES = [
  { id: "INV-2025-001", title: "Semester 1 Tuition Fee", date: "Aug 01, 2025", amount: "$1,200.00", status: "Paid", method: "Credit Card" },
  { id: "INV-2025-002", title: "Library Membership", date: "Sep 15, 2025", amount: "$50.00", status: "Paid", method: "PayPal" },
  { id: "INV-2025-003", title: "Exam Fee - Finals", date: "Oct 20, 2025", amount: "$150.00", status: "Overdue", method: "-" },
  { id: "INV-2025-004", title: "Coding Bootcamp Add-on", date: "Oct 25, 2025", amount: "$300.00", status: "Pending", method: "-" },
];