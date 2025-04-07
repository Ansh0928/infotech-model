
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useUserContext } from "@/context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

export default function Layout({ children, requiresAuth = true }: LayoutProps) {
  const { isOnboarded } = useUserContext();
  const location = useLocation();

  // If page requires authentication and user is not onboarded, redirect to onboarding
  if (requiresAuth && !isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // If user is already onboarded and tries to access onboarding page, redirect to dashboard
  if (isOnboarded && location.pathname === "/onboarding") {
    return <Navigate to="/dashboard" replace />;
  }

  // Don't show sidebar on onboarding page
  const showSidebar = location.pathname !== "/onboarding";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {showSidebar && <Sidebar />}
      <main className="flex-1 overflow-y-auto relative">
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
