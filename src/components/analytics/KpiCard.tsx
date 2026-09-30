import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../ui/Skeleton';

export interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  loading?: boolean;
}

export function KpiCard({ title, value, icon, trend, loading }: KpiCardProps) {
  return (
    <Card hoverEffect className="flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
          {icon}
        </div>
      </div>

      <div>
        {loading ? (
          <Skeleton className="w-32 h-8" />
        ) : (
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">{value}</h2>
        )}

        <div className="flex items-center justify-between mt-3 text-xs min-h-[24px]">
          {loading ? (
            <Skeleton className="w-16 h-5 rounded-full" />
          ) : trend ? (
            <div
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border',
                trend.positive
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-rose-50 text-rose-600 border-rose-200'
              )}
            >
              {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend.positive ? `+${trend.value}%` : `${trend.value}%`}</span>
            </div>
          ) : (
            <div />
          )}

          {trend && !loading && (
            <span className="text-slate-500 text-[11px]">{trend.label}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
