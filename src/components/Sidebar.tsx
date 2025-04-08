
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageCircle, 
  History, 
  Users, 
  Megaphone,
  PieChart, 
  GitBranch,
  Wallet, 
  Link, 
  ShoppingCart, 
  FolderKanban,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/sidebar/NavItem";
import NavSection from "@/components/sidebar/NavSection";
import ProjectSwitcher from "@/components/sidebar/ProjectSwitcher";
import ThemeToggle from "@/components/sidebar/ThemeToggle";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProjectSwitcher, setShowProjectSwitcher] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", section: "Main" },
    { label: "Live Chat", icon: MessageCircle, path: "/chat", badge: 3, section: "Main" },
    { label: "History", icon: History, path: "/history", section: "Main" },
    { label: "Contacts", icon: Users, path: "/contacts", section: "Main" },
    { label: "Campaigns", icon: Megaphone, path: "/campaigns", section: "Marketing" },
    { label: "Ads Manager", icon: PieChart, path: "/ads", section: "Marketing" },
    { label: "Flows", icon: GitBranch, path: "/flows", section: "Automation" },
    { label: "WA Pay", icon: Wallet, path: "/payments", section: "Automation" },
    { label: "Manage", icon: Settings, path: "/manage", section: "System" },
    { label: "Integrations", icon: Link, path: "/integrations", section: "System" },
    { label: "EComm+", icon: ShoppingCart, path: "/ecommerce", section: "System" },
    { label: "My Projects", icon: FolderKanban, path: "/projects", section: "System" },
  ];

  // Group nav items by section
  const groupedNavItems = navItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`
        flex flex-col bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 relative
        ${isCollapsed ? 'w-[70px]' : 'w-[250px]'}
      `}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/89406594-7b8d-48fa-aae3-1f25b3209b52.png" 
              alt="InfoTech Brains Logo" 
              className="h-8 mr-2" 
            />
          </div>
        )}
        <div className="flex items-center ml-auto">
          <ThemeToggle isCollapsed={isCollapsed} />
          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="size-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isCollapsed && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mt-2 mx-auto size-8">
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
      )}

      <div className="overflow-y-auto flex-1 py-4 px-2">
        {Object.entries(groupedNavItems).map(([section, items]) => (
          <NavSection key={section} title={isCollapsed ? undefined : section} isCollapsed={isCollapsed}>
            {items.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                isCollapsed={isCollapsed}
                onClick={() => navigate(item.path)}
                badge={item.badge}
              />
            ))}
          </NavSection>
        ))}
      </div>

      <div className={`mt-auto p-3 border-t border-sidebar-border transition-all`}>
        <ProjectSwitcher 
          isCollapsed={isCollapsed} 
          showProjectSwitcher={showProjectSwitcher} 
          setShowProjectSwitcher={setShowProjectSwitcher} 
        />
      </div>
    </div>
  );
}
