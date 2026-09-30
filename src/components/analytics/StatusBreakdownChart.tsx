import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { StatusBreakdown } from '@/types';

export interface StatusBreakdownChartProps {
  data: StatusBreakdown[];
}

export function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Item Lifecycle Status</CardTitle>
        <CardDescription>Proportional distribution across workflow stages</CardDescription>
      </CardHeader>

      <div className="space-y-4 my-2">
        {data.map(item => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">{item.name}</span>
              <span className="text-slate-400 font-mono">
                {item.count} items ({item.percentage}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color || '#9333ea',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
        • Active items generate active licensing telemetry.
      </div>
    </Card>
  );
}
