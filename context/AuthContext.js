"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { USERS } from "@/lib/data"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check session on load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("edunexus_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    let foundUser = null;
    
    // ✅ Check against all roles (Parent added here)
    if (email === USERS.admin.email && password === "123") foundUser = USERS.admin;
    else if (email === USERS.teacher.email && password === "123") foundUser = USERS.teacher;
    else if (email === USERS.student.email && password === "123") foundUser = USERS.student;
    else if (email === USERS.parent.email && password === "123") foundUser = USERS.parent; // 👈 YEH MISSING THA

    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("edunexus_user", JSON.stringify(foundUser));
      
      // Redirect based on role
      router.push(`/dashboard/${foundUser.role}`);
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials. Try demo accounts." };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("edunexus_user");
    router.push("/login"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);