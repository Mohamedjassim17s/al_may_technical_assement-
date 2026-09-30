import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CaseFormData } from '../../lib/validation';
import { Input } from '../ui/Input';

export function Step3Billing({ form }: { form: UseFormReturn<CaseFormData> }) {
  const { register, formState: { errors }, control } = form;

  const hourlyRate = useWatch({ control, name: 'hourlyRate' }) || 0;
  const billableHours = useWatch({ control, name: 'billableHours' }) || 0;
  const total = hourlyRate * billableHours;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Billing & Assignment</h3>
        <p className="text-sm text-slate-500">Set the lawyer assignment and billing structure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Assigned Lawyer" 
          placeholder="e.g., Mohamed Ali"
          {...register('assignedLawyer')} 
          error={errors.assignedLawyer?.message}
        />
        <Input 
          label="Lawyer Email (Optional)" 
          type="email"
          placeholder="e.g., mohamed@almahy.com"
          {...register('lawyerEmail')} 
          error={errors.lawyerEmail?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">Status</label>
          <select 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm"
            {...register('status')}
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">Priority</label>
          <select 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm"
            {...register('priority')}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.priority && <p className="text-xs text-red-400">{errors.priority.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Estimated Billable Hours" 
          type="number"
          min="0"
          {...register('billableHours')} 
          error={errors.billableHours?.message}
        />
        <Input 
          label="Hourly Rate (AED)" 
          type="number"
          min="0"
          {...register('hourlyRate')} 
          error={errors.hourlyRate?.message}
        />
      </div>

      <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100 shadow-sm">
        <span className="text-slate-600 font-bold">Estimated Total Revenue:</span>
        <span className="text-2xl font-bold text-emerald-500">
          AED {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
