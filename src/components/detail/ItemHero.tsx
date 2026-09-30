import React from 'react';
import { Badge } from '../../components/ui/Badge';

export interface ItemHeroProps {
  title: string;
  subtitle: string;
  status: 'Draft' | 'Active' | 'Pending' | 'Closed' | any;
  metadata: { label: string; value: React.ReactNode }[];
}

export function ItemHero({ title, subtitle, status, metadata }: ItemHeroProps) {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-purple-50/40 border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden mb-8">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={status === 'Active' ? 'success' : status === 'Pending' ? 'warning' : status === 'Draft' ? 'default' : 'secondary'}>
              {status}
            </Badge>
            <span className="text-xs font-mono text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
              {subtitle}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {title}
          </h1>
        </div>

        {/* Dynamic Metadata cards */}
        <div className="flex flex-wrap items-center gap-4 bg-white/70 border border-slate-100 p-4 rounded-2xl backdrop-blur-md shrink-0 shadow-sm">
          {metadata.map((item, idx) => (
            <div key={idx} className={`pr-4 ${idx !== metadata.length - 1 ? 'border-r border-slate-100' : ''}`}>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                {item.label}
              </span>
              <span className="text-lg md:text-xl font-bold text-slate-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
