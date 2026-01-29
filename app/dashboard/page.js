"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(`/dashboard/${user.role}`);
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return <div className="p-8">Redirecting...</div>;
}