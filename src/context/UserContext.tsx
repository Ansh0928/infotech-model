
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";

export interface UserData {
  name: string;
  email: string;
  company: string;
  phone: string;
  website?: string;
  industry: string;
}

interface UserContextType {
  userData: UserData | null;
  saveUserData: (data: UserData) => void;
  isOnboarded: boolean;
}

const initialUserContext: UserContextType = {
  userData: null,
  saveUserData: () => {},
  isOnboarded: false,
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Load from localStorage on init if available
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : null;
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('isOnboarded') === 'true';
  });

  const saveUserData = (data: UserData) => {
    setUserData(data);
    setIsOnboarded(true);
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('isOnboarded', 'true');
    toast.success("User data saved successfully!");
  };

  return (
    <UserContext.Provider value={{ userData, saveUserData, isOnboarded }}>
      {children}
    </UserContext.Provider>
  );
};
