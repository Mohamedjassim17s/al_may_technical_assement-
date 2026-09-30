'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const mockUsers: Record<UserRole, User> = {
  admin: {
    id: 'usr-admin-1',
    name: 'Alex Mercer (Admin)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'admin'
  },
  manager: {
    id: 'usr-mgr-2',
    name: 'Sarah Chen (Lawyer)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'manager'
  },
  viewer: {
    id: 'usr-view-3',
    name: 'David Kovač (Client)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'viewer'
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('admin');
  const [user, setUser] = useState<User | null>(mockUsers['admin']);

  useEffect(() => {
    // Check localStorage for saved session
    const savedRole = localStorage.getItem('apex_user_role') as UserRole;
    if (savedRole && mockUsers[savedRole]) {
      setRoleState(savedRole);
      setUser(mockUsers[savedRole]);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(mockUsers[newRole]);
    localStorage.setItem('apex_user_role', newRole);
  };

  const login = (targetRole: UserRole = 'admin') => {
    setRole(targetRole);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apex_user_role');
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    const hierarchy: Record<UserRole, number> = {
      admin: 3,
      manager: 2,
      viewer: 1,
    };
    return hierarchy[user.role] >= hierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'viewer',
        isAuthenticated: !!user,
        login,
        logout,
        setRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
