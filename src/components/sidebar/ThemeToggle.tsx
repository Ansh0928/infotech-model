
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  isCollapsed: boolean;
}

const ThemeToggle = ({ isCollapsed }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      className={`${isCollapsed ? 'mr-0 size-8' : 'mr-2'} transition-all`}
      size="sm"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Toggle>
  );
};

export default ThemeToggle;
