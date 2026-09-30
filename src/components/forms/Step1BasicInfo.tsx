import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CaseFormData } from '../../lib/validation';
import { Input } from '../ui/Input';

export function Step1BasicInfo({ form }: { form: UseFormReturn<CaseFormData> }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Basic Case Info</h3>
        <p className="text-sm text-slate-500">Provide the core details of the client and case.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Client Name"
          placeholder="e.g., Ahmed Trading LLC"
          {...register('clientName')}
          error={errors.clientName?.message}
        />

        <Input
          label="Case Number"
          placeholder="e.g., CAS-1024"
          {...register('caseNumber')}
          error={errors.caseNumber?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">Client Type</label>
          <select
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm"
            {...register('clientType')}
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          {errors.clientType && <p className="text-xs text-red-400">{errors.clientType.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500">Practice Area</label>
          <select
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm"
            {...register('practiceArea')}
          >
            <option value="Civil">Civil</option>
            <option value="Corporate">Corporate</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Criminal">Criminal</option>
            <option value="Family">Family</option>
          </select>
          {errors.practiceArea && <p className="text-xs text-red-400">{errors.practiceArea.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500">Case Description</label>
        <textarea
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all shadow-sm h-24 resize-none"
          placeholder="Describe the nature of the case or legal service required..."
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
      </div>
    </div>
  );
}
