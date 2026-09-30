'use client';

import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export function Header() {
  const { user, login } = useAuth();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    login(e.target.value as UserRole);
  };

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-2xl">
        <div className="relative shadow-sm rounded-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search cases, clients, documents..."
            className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-4">
        <div className="flex gap-2">
          <button className="relative p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-purple-600 hover:border-purple-100 transition-colors shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-200" />
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-slate-800">{user?.name || 'Guest'}</span>
            <select 
              id="tour-role-selector"
              value={user?.role || 'viewer'} 
              onChange={handleRoleChange}
              className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-purple-500 hover:text-purple-600 transition-colors"
            >
              <option className="bg-white" value="admin">Admin Dashboard</option>
              <option className="bg-white" value="manager">Lawyer / Manager</option>
              <option className="bg-white" value="viewer">Client / Viewer</option>
            </select>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shadow-sm">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
