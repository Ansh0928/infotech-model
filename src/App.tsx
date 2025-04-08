
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import ManageLayout from "./pages/Manage/ManageLayout";
import Templates from "./pages/Manage/Templates";
import OptinManagement from "./pages/Manage/OptinManagement";
import LiveChatSettings from "./pages/Manage/LiveChatSettings";
import Agents from "./pages/Manage/Agents";
import Tags from "./pages/Manage/Tags";
import Analytics from "./pages/Manage/Analytics";
import ApiKey from "./pages/Manage/ApiKey";
import Billing from "./pages/Manage/Billing";
import Notifications from "./pages/Manage/Notifications";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<NotFound title="Live Chat" message="Live chat functionality coming soon" />} />
              <Route path="/history" element={<NotFound title="History" message="Chat history coming soon" />} />
              <Route path="/contacts" element={<NotFound title="Contacts" message="Contact management coming soon" />} />
              <Route path="/campaigns" element={<NotFound title="Campaigns" message="Campaign management coming soon" />} />
              <Route path="/ads" element={<NotFound title="Ads Manager" message="Ads management coming soon" />} />
              <Route path="/flows" element={<NotFound title="Flows" message="Automation flows coming soon" />} />
              <Route path="/payments" element={<NotFound title="WA Pay" message="Payment functionality coming soon" />} />
              <Route path="/ecommerce" element={<NotFound title="EComm+" message="E-commerce features coming soon" />} />
              <Route path="/projects" element={<Projects />} />
              
              {/* Manage section routes */}
              <Route path="/manage" element={<ManageLayout />}>
                <Route index element={<Navigate to="/manage/templates" replace />} />
                <Route path="templates" element={<Templates />} />
                <Route path="optin" element={<OptinManagement />} />
                <Route path="chat-settings" element={<LiveChatSettings />} />
                <Route path="agents" element={<Agents />} />
                <Route path="tags" element={<Tags />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="api" element={<ApiKey />} />
                <Route path="billing" element={<Billing />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
