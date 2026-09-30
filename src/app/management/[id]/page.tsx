'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Case, ActivityLog } from '../../../types';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Badge } from '../../../components/ui/Badge';
import { ItemHero } from '../../../components/detail/ItemHero';
import { EditableField } from '../../../components/detail/EditableField';
import { ActivityTimeline } from '../../../components/detail/ActivityTimeline';
import { RelatedRecords } from '../../../components/detail/RelatedRecords';

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const { role } = useAuth();

  const [data, setData] = useState<Case | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/cases/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            router.push('/management');
            showToast('Case not found', 'error');
            return;
          }
          throw new Error('Failed to fetch details');
        }
        const json = await res.json();
        setData(json.case);
        setLogs(json.logs);
      } catch (err) {
        showToast('Error loading case details', 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [params.id, router, showToast]);

  const handleUpdate = async (field: keyof Case, value: any) => {
    if (!data) return;
    const oldVal = data[field];

    // Optimistic update
    setData({ ...data, [field]: value });

    try {
      const res = await fetch(`/api/cases/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': role
        },
        body: JSON.stringify({ updates: { [field]: value } })
      });
      if (!res.ok) throw new Error('Update failed');

      const updated = await res.json();
      setData(updated);
      showToast('Successfully updated', 'success');

      // refetch logs
      const logsRes = await fetch(`/api/cases/${params.id}`);
      const logsJson = await logsRes.json();
      setLogs(logsJson.logs);
    } catch (err) {
      setData({ ...data, [field]: oldVal });
      showToast('Failed to update field', 'error');
    }
  };

  const handleAddNote = async (note: string) => {
    try {
      const res = await fetch(`/api/cases/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': role
        },
        body: JSON.stringify({ action: 'add_note', note })
      });
      if (!res.ok) throw new Error('Failed to add note');

      const newLog = await res.json();
      setLogs([newLog, ...logs]);
      showToast('Note added', 'success');
    } catch (err) {
      showToast('Failed to add note', 'error');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-full h-64 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push('/management')} className="pl-0 text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Cases
      </Button>

      <PageHeader
        title={`Case: ${data.caseNumber}`}
        description={data.clientName}
        action={
          <Button variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Full Case
          </Button>
        }
      />

      <ItemHero
        title={data.clientName}
        subtitle={`${data.practiceArea} • ${data.clientType}`}
        status={data.status}
        metadata={[
          { label: 'Assigned Lawyer', value: data.assignedLawyer },
          { label: 'Priority', value: data.priority },
          { label: 'Billable Hours', value: `${data.billableHours} hrs` },
          { label: 'Hourly Rate', value: `AED ${data.hourlyRate}/hr` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Case Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <EditableField label="Client Name" value={data.clientName} onSave={(v) => handleUpdate('clientName', v)} />
              <EditableField label="Case Number" value={data.caseNumber} onSave={(v) => handleUpdate('caseNumber', v)} />

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Practice Area</span>
                <div>
                  <select
                    className="bg-slate-50 text-slate-800 border-b border-dashed border-slate-300 pb-1 focus:outline-none focus:border-purple-500 font-medium text-sm w-full transition-colors"
                    value={data.practiceArea}
                    onChange={(e) => handleUpdate('practiceArea', e.target.value)}
                  >
                    <option className="bg-white" value="Civil">Civil</option>
                    <option className="bg-white" value="Corporate">Corporate</option>
                    <option className="bg-white" value="Real Estate">Real Estate</option>
                    <option className="bg-white" value="Criminal">Criminal</option>
                    <option className="bg-white" value="Family">Family</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <div>
                  <select
                    className="bg-slate-50 text-slate-800 border-b border-dashed border-slate-300 pb-1 focus:outline-none focus:border-purple-500 font-medium text-sm w-full transition-colors"
                    value={data.status}
                    onChange={(e) => handleUpdate('status', e.target.value)}
                  >
                    <option className="bg-white" value="Draft">Draft</option>
                    <option className="bg-white" value="Active">Active</option>
                    <option className="bg-white" value="Pending">Pending</option>
                    <option className="bg-white" value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Description</span>
                <p className="text-slate-600 mt-1 whitespace-pre-wrap leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {data.description}
                </p>
              </div>

              <div className="md:col-span-2 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map(t => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                  {data.tags.length === 0 && <span className="text-sm text-slate-500 italic">No tags assigned</span>}
                </div>
              </div>
            </div>
          </div>

          <RelatedRecords />
        </div>

        <div>
          <ActivityTimeline logs={logs} onAddNote={handleAddNote} />
        </div>
      </div>
    </div>
  );
}
