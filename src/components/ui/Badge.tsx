import React from 'react';
import { cn } from '@/lib/utils';
import { ItemCategory, ItemPriority, ItemStatus } from '@/types';

type BadgeVariant = ItemStatus | ItemPriority | ItemCategory | 'default' | 'admin' | 'manager' | 'viewer';

export interface BadgeProps {
  variant?: BadgeVariant | string;
  children: React.ReactNode;
  className?: string;
  showDot?: boolean;
}

export function Badge({ variant = 'default', children, className, showDot = true }: BadgeProps) {
  const getStyles = (val: string) => {
    switch (val) {
      case 'Active':
      case 'Completed':
      case 'success':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200 dot-emerald-500';
      case 'Pending':
      case 'Processing':
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-200 dot-amber-500';
      case 'Closed':
      case 'Archived':
      case 'Failed':
      case 'secondary':
        return 'bg-slate-50 text-slate-600 border-slate-200 dot-slate-500';
      case 'Draft':
      case 'default':
        return 'bg-blue-50 text-blue-600 border-blue-200 dot-blue-500';
      case 'Critical':
        return 'bg-rose-50 text-rose-600 border-rose-200 dot-rose-500 font-semibold';
      case 'High':
        return 'bg-orange-50 text-orange-600 border-orange-200 dot-orange-500';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200 dot-yellow-500';
      case 'Low':
        return 'bg-sky-50 text-sky-600 border-sky-200 dot-sky-500';
      case 'admin':
        return 'bg-purple-50 text-purple-600 border-purple-200 dot-purple-500 font-medium';
      case 'manager':
        return 'bg-indigo-50 text-indigo-600 border-indigo-200 dot-indigo-500 font-medium';
      case 'viewer':
        return 'bg-slate-100 text-slate-600 border-slate-300 dot-slate-500 font-medium';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200 dot-slate-500';
    }
  };

  const styleClass = getStyles(variant);
  const dotColor = styleClass.split(' ').find(c => c.startsWith('dot-'))?.replace('dot-', 'bg-') || 'bg-slate-500';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-medium tracking-wide transition-all duration-150 shrink-0',
        styleClass,
        className
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse-subtle', dotColor)} />
      )}
      {children}
    </span>
  );
}
