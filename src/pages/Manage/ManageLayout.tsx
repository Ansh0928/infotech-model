
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    icon: <Zap className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Optin Management', 
    path: '/manage/optin', 
    icon: <CheckSquare className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Live Chat Settings', 
    path: '/manage/chat-settings', 
    icon: <MessageSquare className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Agents', 
    path: '/manage/agents', 
    icon: <UserCircle className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Tags', 
    path: '/manage/tags', 
    icon: <Tag className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Analytics', 
    path: '/manage/analytics', 
    icon: <BarChart className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'API Key', 
    path: '/manage/api', 
    icon: <Key className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Billing & Usage', 
    path: '/manage/billing', 
    icon: <CreditCard className="h-4 w-4 mr-2" /> 
  },
  { 
    name: 'Notification Prefs', 
    path: '/manage/notifications', 
    icon: <Bell className="h-4 w-4 mr-2" /> 
  }
];

const ManageLayout: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2] || 'templates';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Manage</h1>
          <p className="text-muted-foreground">
            Configure system settings and manage business operations
          </p>
        </div>
        
        <div className="flex overflow-x-auto pb-2">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="bg-card">
              {manageItems.map((item) => (
                <TabsTrigger
                  key={item.path}
                  value={item.path.split('/')[2]}
                  className="flex items-center gap-1"
                  asChild
                >
                  <NavLink to={item.path} className="flex items-center">
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default ManageLayout;
