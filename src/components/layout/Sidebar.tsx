'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Scale, Settings, Users, PlayCircle } from 'lucide-react';
import { useTour } from '../../context/TourContext';
import { useToast } from '../../context/ToastContext';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clients & Cases', href: '/management', icon: Scale, id: 'tour-sidebar-management' },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { startTour } = useTour();
  const { showToast } = useToast();

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
      <div className="h-20 flex items-center px-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30">
          <Scale className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">Al Mahy</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Main Menu</div>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              id={item.id}
              onClick={item.href === '#' ? (e) => {
                e.preventDefault();
                showToast(`${item.name} module is coming soon!`, 'info');
              } : undefined}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive
                ? 'bg-purple-50 text-purple-600 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${isActive ? 'text-purple-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600 shadow-[0_0_5px_rgba(147,51,234,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button
          onClick={startTour}
          className="w-full flex items-center justify-center py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold shadow-md shadow-purple-600/30 hover:bg-purple-700 hover:-translate-y-0.5 transition-all"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Play App Demo
        </button>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 mb-2">System Status</p>
          <div className="flex items-center text-emerald-500 text-xs font-bold">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </div>
  );
}
