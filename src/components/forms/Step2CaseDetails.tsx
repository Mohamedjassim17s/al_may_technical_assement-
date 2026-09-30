import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CaseFormData } from '../../lib/validation';
import { Input } from '../ui/Input';

export function Step2CaseDetails({ form }: { form: UseFormReturn<CaseFormData> }) {
  const { register, control } = form;
  
  // Conditional rendering based on practice area
  const practiceArea = useWatch({ control, name: 'practiceArea' });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Specific Details</h3>
        <p className="text-sm text-slate-500">Additional information based on the practice area.</p>
      </div>

      <div className="p-4 rounded-[12px] bg-purple-50 border border-purple-100 text-purple-800 text-sm mb-6">
        Showing conditional fields for: <strong>{practiceArea || 'None selected'}</strong>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceArea === 'Corporate' && (
          <>
            <Input label="Jurisdiction" placeholder="e.g., Dubai Mainland" {...register('caseDetails.Jurisdiction')} />
            <Input label="License Type" placeholder="e.g., Commercial" {...register('caseDetails.License Type')} />
          </>
        )}

        {practiceArea === 'Real Estate' && (
          <>
            <Input label="Property Location" placeholder="e.g., Downtown Dubai" {...register('caseDetails.Location')} />
            <Input label="Property Value" placeholder="e.g., AED 5,000,000" {...register('caseDetails.Value')} />
          </>
        )}

        {practiceArea === 'Civil' && (
          <>
            <Input label="Court Name" placeholder="e.g., Dubai Civil Court" {...register('caseDetails.Court')} />
            <Input label="Dispute Amount" placeholder="e.g., AED 150,000" {...register('caseDetails.Dispute Amount')} />
          </>
        )}
        
        {practiceArea === 'Criminal' && (
          <>
            <Input label="Police Station" placeholder="e.g., Bur Dubai" {...register('caseDetails.Police Station')} />
            <Input label="Charge Type" placeholder="e.g., Misdemeanor" {...register('caseDetails.Charge')} />
          </>
        )}

        {practiceArea === 'Family' && (
          <>
            <Input label="Marriage Date (if applicable)" placeholder="YYYY-MM-DD" {...register('caseDetails.Marriage Date')} />
            <Input label="Children" placeholder="Number of children" {...register('caseDetails.Children')} />
          </>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Input 
          label="Tags (Comma separated)" 
          placeholder="e.g., Urgent, VIP Client, Appeal"
          onChange={(e) => {
            const val = e.target.value;
            form.setValue('tags', val.split(',').map(s => s.trim()).filter(Boolean));
          }}
        />
      </div>
    </div>
  );
}
