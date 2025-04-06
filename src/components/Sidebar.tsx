
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Settings, 
  MessageCircle, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, path, isCollapsed, isActive, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`
        w-full justify-start mb-1 relative group
        ${isActive ? 'bg-accent text-accent-foreground' : ''}
      `}
    >
      <div className="flex items-center w-full">
        <Icon className="h-5 w-5 mr-3" />
        {!isCollapsed && <span>{label}</span>}
      </div>
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1 bg-brand-500 rounded-l-full" />
      )}
    </Button>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
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
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Integrations", icon: MessageCircle, path: "/integrations" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`
        flex flex-col bg-sidebar border-r border-border transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/89406594-7b8d-48fa-aae3-1f25b3209b52.png" 
              alt="InfoTech Brains Logo" 
              className="h-8 mr-2" 
            />
          </div>
        )}
        <div className="flex items-center">
          <Toggle 
            pressed={theme === 'dark'} 
            onPressedChange={toggleTheme}
            className="mr-2"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {userData && (
        <div className="p-4 border-b border-border flex items-center">
          <div className="h-10 w-10 rounded-full bg-brand-400 text-white flex items-center justify-center mr-3">
            {userData.name.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-medium truncate">{userData.name}</p>
              <p className="text-sm text-muted-foreground truncate">{userData.company}</p>
            </div>
          )}
        </div>
      )}

      <div className="p-2 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}
