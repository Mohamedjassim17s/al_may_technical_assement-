'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { CategoryDistribution } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface CategoryPieChartProps {
  data: CategoryDistribution[];
  loading?: boolean;
}

export function CategoryPieChart({ data, loading }: CategoryPieChartProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Practice Area Summary</CardTitle>
        <CardDescription>Breakdown by legal and corporate categories</CardDescription>
      </CardHeader>

      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#9333ea', '#3b82f6', '#14b8a6', '#f59e0b', '#ec4899'][index % 5]} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '0.75rem',
                color: '#1e293b',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: any) => [`${value} Cases`, 'Count']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mt-2 border-t border-slate-100 pt-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ['#9333ea', '#3b82f6', '#14b8a6', '#f59e0b', '#ec4899'][index % 5] }} />
            <span className="text-slate-700 font-semibold truncate">{item.name}</span>
            <span className="text-slate-400 font-mono ml-auto">({item.value})</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
