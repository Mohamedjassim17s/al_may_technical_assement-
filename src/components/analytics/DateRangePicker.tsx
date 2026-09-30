'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DateRange = string;

export interface DateRangePickerProps {
  selected?: DateRange;
  value?: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ selected, value, onChange }: DateRangePickerProps) {
  const activeValue = selected ?? value ?? '7d';
  const ranges = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div className="px-3 text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
      </div>
      {ranges.map(r => {
        const active = activeValue === r.value;
        return (
          <button
            key={r.value}
            onClick={() => onChange(r.value)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200',
              active
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
