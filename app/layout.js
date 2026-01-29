import "./globals.css";

export const metadata = {
  title: "EduNexus Global LMS",
  description: "Enterprise Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
