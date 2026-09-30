'use client';

import React from 'react';
import { Trash2, Download, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RoleGuard } from '@/components/management/RoleGuard';
import { ItemStatus } from '@/types';

export interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: string) => void;
  onExportSelected: (format: 'csv' | 'json') => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkStatusChange,
  onExportSelected,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 border border-slate-200 text-slate-800 px-6 py-3.5 rounded-[24px] shadow-[0_20px_60px_rgb(0,0,0,0.1)] backdrop-blur-xl flex flex-wrap items-center gap-4 animate-slide-up">
      {/* Selected Counter */}
      <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
        <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">
          {selectedCount}
        </span>
        <span className="text-xs font-semibold text-slate-600">Items Selected</span>
      </div>

      {/* Bulk Status Update Selector */}
      <RoleGuard requiredRole="manager" fallbackMode="disable">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Set Status:</span>
          <div className="flex items-center gap-1">
            {(['Active', 'Pending', 'Closed', 'Draft']).map(status => (
              <button
                key={status}
                onClick={() => onBulkStatusChange(status)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 transition-colors"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </RoleGuard>

      {/* Export Actions */}
      <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportSelected('csv')}
          leftIcon={<Download className="w-3.5 h-3.5 text-cyan-400" />}
        >
          CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportSelected('json')}
          leftIcon={<Download className="w-3.5 h-3.5 text-amber-400" />}
        >
          JSON
        </Button>
      </div>

      {/* Delete Action (Admin Only) */}
      <RoleGuard requiredRole="admin" fallbackMode="disable">
        <Button
          variant="danger"
          size="sm"
          onClick={onBulkDelete}
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
        >
          Delete Selected
        </Button>
      </RoleGuard>

      {/* Dismiss Selection Button */}
      <button
        onClick={onClearSelection}
        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors ml-2"
        aria-label="Clear Selection"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
