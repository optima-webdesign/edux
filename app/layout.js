import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ✅ Import

export const metadata = {
  title: "EduNexus Global LMS",
  description: "Enterprise Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <AuthProvider>
          {children}
          {/* ✅ Toast Position set ki */}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </AuthProvider>
      </body>
    </html>
  );
}