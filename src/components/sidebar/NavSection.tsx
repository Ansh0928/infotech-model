
import React from "react";

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

export default NavSection;
