import React, { useState } from 'react';
import { Case } from '../../types';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BulkActionsBar } from './BulkActionsBar';
import { RoleGuard } from './RoleGuard';
import { ConfirmModal } from '../ui/ConfirmModal';

interface ManagementTableProps {
  data: Case[];
  loading: boolean;
  onSort: (sortBy: keyof Case, sortDir: 'asc' | 'desc') => void;
  currentSort: { sortBy?: keyof Case, sortDir?: 'asc' | 'desc' };
  onStatusChange: (ids: string[], status: string) => Promise<void>;
  onDelete: (ids: string[]) => Promise<void>;
}

export function ManagementTable({ data, loading, onSort, currentSort, onStatusChange, onDelete }: ManagementTableProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[] | null>(null);

  const toggleAll = () => {
    if (selectedIds.length === data.length) setSelectedIds([]);
    else setSelectedIds(data.map(d => d.id));
  };

  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(prev => prev.filter(i => i !== id));
    else setSelectedIds(prev => [...prev, id]);
  };

  const handleSort = (field: keyof Case) => {
    if (currentSort.sortBy === field) {
      onSort(field, currentSort.sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(field, 'asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Case }) => {
    if (currentSort.sortBy !== field) return <ArrowUpDown className="w-3 h-3 text-slate-300 ml-1 inline-block" />;
    return currentSort.sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 text-purple-600 ml-1 inline-block" />
      : <ArrowDown className="w-3 h-3 text-purple-600 ml-1 inline-block" />;
  };

  const clearSelection = () => setSelectedIds([]);

  return (
    <div className="relative">
      <ConfirmModal
        isOpen={deleteIds !== null}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${deleteIds?.length === 1 ? 'this case' : `these ${deleteIds?.length} cases`}? This action cannot be undone.`}
        confirmText="Delete"
        onCancel={() => setDeleteIds(null)}
        onConfirm={async () => {
          if (deleteIds) {
            await onDelete(deleteIds);
            clearSelection();
            setDeleteIds(null);
          }
        }}
      />
      <BulkActionsBar
        selectedCount={selectedIds.length}
        onClearSelection={clearSelection}
        onBulkDelete={() => setDeleteIds(selectedIds)}
        onBulkStatusChange={async (s) => { await onStatusChange(selectedIds, s); clearSelection(); }}
        onExportSelected={(format) => { alert(`Exporting ${selectedIds.length} cases to ${format.toUpperCase()}`); clearSelection(); }}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <th id="tour-table-checkbox" className="p-4 w-12">
                <input
                  type="checkbox"
                  className="rounded border-slate-200 bg-white text-purple-600 focus:ring-purple-600/20"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={toggleAll}
                  disabled={loading || data.length === 0}
                />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('caseNumber')}>
                Case # <SortIcon field="caseNumber" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('clientName')}>
                Client <SortIcon field="clientName" />
              </th>
              <th className="p-4">Practice Area</th>
              <th className="p-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('status')}>
                Status <SortIcon field="status" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('hourlyRate')}>
                Rate <SortIcon field="hourlyRate" />
              </th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4"><Skeleton className="w-4 h-4 rounded" /></td>
                  <td className="p-4"><Skeleton className="w-20 h-4" /></td>
                  <td className="p-4"><Skeleton className="w-40 h-4" /></td>
                  <td className="p-4"><Skeleton className="w-24 h-4" /></td>
                  <td className="p-4"><Skeleton className="w-16 h-6 rounded-full" /></td>
                  <td className="p-4"><Skeleton className="w-20 h-4" /></td>
                  <td className="p-4 text-right"><Skeleton className="w-16 h-8 inline-block" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  <div className="flex flex-col items-center">
                    <p className="mb-2 font-semibold">No cases found.</p>
                    <p className="text-sm">Try changing your filters or searching for something else.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((c) => {
                const isSelected = selectedIds.includes(c.id);
                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-purple-50/50' : ''}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-slate-200 bg-white text-purple-600 focus:ring-purple-600/20"
                        checked={isSelected}
                        onChange={() => toggleOne(c.id)}
                      />
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700">{c.caseNumber}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{c.clientName}</span>
                        <span className="text-[11px] font-medium text-slate-400">{c.clientType} • {c.assignedLawyer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500">{c.practiceArea}</td>
                    <td className="p-4">
                      <Badge variant={c.status === 'Active' ? 'success' : c.status === 'Pending' ? 'warning' : c.status === 'Draft' ? 'default' : 'secondary'}>
                        {c.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500">
                      AED {c.hourlyRate}/hr
                    </td>
                    <td id={c.id === data[0]?.id ? "tour-table-actions" : undefined} className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/management/${c.id}`)}
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="View/Edit Case"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <RoleGuard requiredRole="admin" fallbackMode="hide">
                          <button
                            onClick={() => setDeleteIds([c.id])}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Case"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </RoleGuard>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
