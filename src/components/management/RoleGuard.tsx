'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Lock } from 'lucide-react';

export interface RoleGuardProps {
  requiredRole: UserRole;
  children: React.ReactNode;
  fallbackMode?: 'hide' | 'disable';
}

export function RoleGuard({ requiredRole, children, fallbackMode = 'disable' }: RoleGuardProps) {
  const { hasPermission } = useAuth();
  const allowed = hasPermission(requiredRole);

  if (allowed) {
    return <>{children}</>;
  }

  if (fallbackMode === 'hide') {
    return null;
  }

  return (
    <div className="relative group inline-block cursor-not-allowed opacity-60 pointer-events-none">
      {children}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 bg-slate-950 text-rose-300 text-[10px] px-2 py-1 rounded border border-rose-500/30 whitespace-nowrap shadow-lg">
        <Lock className="w-3 h-3" />
        Requires {requiredRole.toUpperCase()} role
      </div>
    </div>
  );
}
