import { NextResponse } from 'next/server';
import globalDb from '../../../lib/db';

const SIMULATE_DELAY = parseInt(process.env.NEXT_PUBLIC_API_SIMULATE_DELAY || '0', 10);
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function GET() {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const analytics = globalDb.getAnalytics();
  
  // Generate some fake timeline data for the charts
  const revenueData = [];
  const now = new Date();
  for(let i=6; i>=0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    revenueData.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      cases: Math.floor(Math.random() * 10) + 1
    });
  }

  return NextResponse.json({
    kpis: {
      totalCases: analytics.totalCases,
      activeCases: analytics.activeCases,
      totalRevenue: analytics.totalRevenue,
      completedCases: analytics.completedCases
    },
    charts: {
      revenueTimeline: revenueData,
      areaBreakdown: analytics.areaBreakdown
    }
  });
}
