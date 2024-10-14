// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Make sure you're using next/navigation for app directory
import { decodeJWT } from '@/lib/decodeJWT';

// Define the shape of the JWT payload
interface JWTPayload {
  userId: string;
  email: string;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  email: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = decodeJWT(token) as JWTPayload;
      setEmail(decode.email);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decode = decodeJWT(token) as JWTPayload;
      setEmail(decode.email);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ email, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
