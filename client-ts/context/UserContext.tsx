import React, { createContext, useState, ReactNode } from 'react';

// Define types for user data
export interface User {
  id: string;
  // Add other user properties as needed
  // Example: name: string;
  // Example: email: string;
}

// Define the context type
interface UserContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  updateUser: (userData: User) => void;
}

// Create context with default values
export const UserType = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  user: null,
  updateUser: () => {},
});

// Props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserType.Provider value={{ userId, setUserId, user, updateUser }}>
      {children}
    </UserType.Provider>
  );
}; 
