
import { useState, useEffect } from "react";

type Theme = 'light' | 'dark';

export const useTheme = () => {
  // Initialize theme from localStorage on component mount
  const [theme, setTheme] = useState<Theme>('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
};
