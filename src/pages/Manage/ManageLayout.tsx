
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  Zap, 
  CheckSquare, 
  MessageSquare, 
  UserCircle, 
  Tag, 
  BarChart, 
  Key, 
  CreditCard, 
  Bell 
} from 'lucide-react';

const manageItems = [
  { 
    name: 'Template Message', 
    path: '/manage/templates', 
    icon: <Zap className="h-4 w-4" /> 
  },
  { 
    name: 'Optin Management', 
    path: '/manage/optin', 
    icon: <CheckSquare className="h-4 w-4" /> 
  },
  { 
    name: 'Live Chat Settings', 
    path: '/manage/chat-settings', 
    icon: <MessageSquare className="h-4 w-4" /> 
  },
  { 
    name: 'Agents', 
    path: '/manage/agents', 
    icon: <UserCircle className="h-4 w-4" /> 
  },
  { 
    name: 'Tags', 
    path: '/manage/tags', 
    icon: <Tag className="h-4 w-4" /> 
  },
  { 
    name: 'Analytics', 
    path: '/manage/analytics', 
    icon: <BarChart className="h-4 w-4" /> 
  },
  { 
    name: 'API Key', 
    path: '/manage/api', 
    icon: <Key className="h-4 w-4" /> 
  },
  { 
    name: 'Billing & Usage', 
    path: '/manage/billing', 
    icon: <CreditCard className="h-4 w-4" /> 
  },
  { 
    name: 'Notification Prefs', 
    path: '/manage/notifications', 
    icon: <Bell className="h-4 w-4" /> 
  }
];

const ManageLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Manage</h1>
          <p className="text-muted-foreground">
            Configure system settings and manage business operations
          </p>
        </div>
        
        <div className="flex gap-6">
          {/* Left Sidebar Navigation */}
          <div className="w-64 shrink-0">
            <div className="bg-card rounded-lg border overflow-hidden">
              <nav className="flex flex-col p-2 space-y-1">
                {manageItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2 text-sm rounded-md
                      hover:bg-accent hover:text-accent-foreground
                      ${isActive ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'}
                    `}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-card p-6 rounded-lg border h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageLayout;
