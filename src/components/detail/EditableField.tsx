'use client';

import React, { useState } from 'react';
import { Edit2, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RoleGuard } from '@/components/management/RoleGuard';

export interface EditableFieldProps {
  label: string;
  value: string | number;
  onSave: (newValue: string) => Promise<void>;
  type?: 'text' | 'number' | 'textarea';
}

export function EditableField({ label, value, onSave, type = 'text' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(inputValue);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setInputValue(String(value));
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl transition-all duration-200 hover:border-slate-200">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        {!isEditing && (
          <RoleGuard requiredRole="manager" fallbackMode="hide">
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-purple-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title={`Edit ${label}`}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </RoleGuard>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3 mt-2">
          {type === 'textarea' ? (
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              rows={4}
              className="w-full bg-white border border-purple-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          ) : (
            <input
              type={type}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          )}

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isSaving}>
              <X className="w-3.5 h-3.5 mr-1" />
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>
              <Check className="w-3.5 h-3.5 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-sm font-medium text-slate-800 mt-1 whitespace-pre-wrap">
          {value || <span className="text-slate-400 italic">Not specified</span>}
        </div>
      )}
    </div>
  );
}
