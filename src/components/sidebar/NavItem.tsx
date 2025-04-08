
import React from "react";
import { Button } from "@/components/ui/button";

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

export default NavItem;
