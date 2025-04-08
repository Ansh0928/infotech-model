import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
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
  Sun,
  Moon,
  PlusCircle,
  ChevronDown,
  Settings, // For Manage section
  Zap, // For template message
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  badge?: number;
}

const NavItem = ({ icon: Icon, label, path, isActive, isCollapsed, onClick, badge }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`
        w-full justify-start mb-1 relative group transition-all duration-200
        ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
        hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground
      `}
    >
      <div className="flex items-center w-full">
        <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full">
            <span className="truncate">{label}</span>
            {badge && (
              <span className="ml-auto bg-primary/20 text-primary text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-primary rounded-r-full" />
      )}
    </Button>
  );
};

interface NavSectionProps {
  title?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

const NavSection = ({ title, children, isCollapsed }: NavSectionProps) => {
  return (
    <div className="mb-4">
      {title && !isCollapsed && (
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showProjectSwitcher, setShowProjectSwitcher] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserContext();

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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

  const projects = [
    { name: "InfoTech Brains", id: "1" },
    { name: "Digital Dynamics", id: "2" },
    { name: "Tech Solutions", id: "3" },
  ];

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
          <Toggle 
            pressed={theme === 'dark'} 
            onPressedChange={toggleTheme}
            className={`${isCollapsed ? 'mr-0 size-8' : 'mr-2'} transition-all`}
            size="sm"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
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
        <DropdownMenu open={showProjectSwitcher} onOpenChange={setShowProjectSwitcher}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={`w-full justify-start p-2 h-auto text-start ${isCollapsed ? 'px-2' : ''}`}
            >
              <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'items-center gap-3'}`}>
                <Avatar className={`size-8 ${isCollapsed ? 'mb-1' : ''}`}>
                  <AvatarImage src={userData?.name?.charAt(0) || 'U'} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {userData?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-[140px]">
                        {userData?.company || 'InfoTech Brains'}
                      </p>
                      <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                      {userData?.email || 'user@example.com'}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[240px]" align={isCollapsed ? "center" : "start"}>
            <div className="p-2">
              <div className="text-sm font-medium">Projects</div>
              <div className="mt-2 space-y-1">
                {projects.map(project => (
                  <DropdownMenuItem key={project.id} className="cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">
                        {project.name[0]}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="cursor-pointer mt-2">
                  <div className="flex items-center text-primary">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>Create new project</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
