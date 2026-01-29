"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { USERS } from "@/lib/data";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // Init user from sessionStorage
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const storedUser = sessionStorage.getItem("edunexus_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ❌ NO useEffect needed
  const [loading] = useState(false);

  const login = (email, password) => {
    let foundUser = null;

    if (email === USERS.admin.email && password === "123") foundUser = USERS.admin;
    else if (email === USERS.teacher.email && password === "123") foundUser = USERS.teacher;
    else if (email === USERS.student.email && password === "123") foundUser = USERS.student;
    else if (email === USERS.parent.email && password === "123") foundUser = USERS.parent;

    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("edunexus_user", JSON.stringify(foundUser));
      router.push(`/dashboard/${foundUser.role}`);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("edunexus_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
