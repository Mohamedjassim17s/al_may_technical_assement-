import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CaseFormData } from '../../lib/validation';

export function Step4ReviewSubmit({ form }: { form: UseFormReturn<CaseFormData> }) {
  const data = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Review & Submit</h3>
        <p className="text-sm text-slate-500">Please review the case details before finalizing.</p>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Basic Info</h4>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-slate-500">Client Name:</dt>
            <dd className="text-slate-800 font-bold">{data.clientName || '-'}</dd>
            <dt className="text-slate-500">Client Type:</dt>
            <dd className="text-slate-800 font-bold">{data.clientType}</dd>
            <dt className="text-slate-500">Case Number:</dt>
            <dd className="text-slate-800 font-bold">{data.caseNumber || '-'}</dd>
            <dt className="text-slate-500">Practice Area:</dt>
            <dd className="text-slate-800 font-bold">{data.practiceArea}</dd>
          </dl>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assignment & Billing</h4>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-slate-500">Assigned Lawyer:</dt>
            <dd className="text-slate-800 font-bold">{data.assignedLawyer || '-'}</dd>
            <dt className="text-slate-500">Priority:</dt>
            <dd className="text-slate-800 font-bold">{data.priority}</dd>
            <dt className="text-slate-500">Estimated Total:</dt>
            <dd className="text-emerald-600 font-bold">AED {((data.hourlyRate || 0) * (data.billableHours || 0)).toLocaleString()}</dd>
          </dl>
        </div>

        {Object.keys(data.caseDetails || {}).length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Specific Details</h4>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {Object.entries(data.caseDetails).map(([key, value]) => (
                <React.Fragment key={key}>
                  <dt className="text-slate-500">{key}:</dt>
                  <dd className="text-slate-800 font-bold">{String(value) || '-'}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}
      </div>
      
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          Please fix validation errors in previous steps before submitting.
        </div>
      )}
    </div>
  );
}
