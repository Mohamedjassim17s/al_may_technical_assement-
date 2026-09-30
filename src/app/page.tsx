'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { KpiCard } from '../components/analytics/KpiCard';
import { RevenueChart } from '../components/analytics/RevenueChart';
import { CategoryPieChart } from '../components/analytics/CategoryPieChart';
import { DateRangePicker, DateRange } from '../components/analytics/DateRangePicker';
import { DollarSign, Briefcase, CheckCircle, Scale } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { showToast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics?range=${dateRange}`);
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const json = await res.json();
        setData(json);
      } catch (err) {
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [dateRange, showToast]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <PageHeader 
          title="Legal & Corporate Dashboard" 
          description="Overview of cases, clients, and financial metrics." 
        />
        <div id="tour-date-picker">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      <div id="tour-dashboard-kpi" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Revenue" 
          value={data ? `AED ${data.kpis.totalRevenue.toLocaleString()}` : ''} 
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />} 
          trend={{ value: 12.5, label: 'vs last period', positive: true }}
          loading={loading}
        />
        <KpiCard 
          title="Active Cases" 
          value={data?.kpis.activeCases.toString() || ''} 
          icon={<Briefcase className="w-5 h-5 text-blue-500" />} 
          trend={{ value: 5.2, label: 'vs last period', positive: true }}
          loading={loading}
        />
        <KpiCard 
          title="Total Cases" 
          value={data?.kpis.totalCases.toString() || ''} 
          icon={<Scale className="w-5 h-5 text-purple-500" />} 
          loading={loading}
        />
        <KpiCard 
          title="Completed Cases" 
          value={data?.kpis.completedCases.toString() || ''} 
          icon={<CheckCircle className="w-5 h-5 text-slate-400" />} 
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data?.charts?.revenueTimeline || []} loading={loading} />
        </div>
        <div>
          <CategoryPieChart data={data?.charts?.areaBreakdown || []} loading={loading} />
        </div>
      </div>
    </div>
  );
}
