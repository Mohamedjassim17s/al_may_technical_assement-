import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MultiStepForm } from '@/components/forms/MultiStepForm';

export default function NewRecordPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Provision New Catalog Record"
        description="Multi-step wizard with client/server schema validation, conditional rules, and background autosave"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Management Portal', href: '/management' },
          { label: 'New Record Wizard' },
        ]}
      />

      <MultiStepForm />
    </div>
  );
}
