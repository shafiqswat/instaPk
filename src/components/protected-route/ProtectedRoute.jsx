/** @format */
// components/ProtectedRoute.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading/Loading";

const ProtectedRoute = ({ children, forAuthPages = false }) => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (forAuthPages && isAuthenticated) {
        // router.push("/");
      } else if (!forAuthPages && !isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isAuthLoading, forAuthPages, router]);

  if (isAuthLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
