'use client';

import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { ChevronRight, PlayCircle, ShieldAlert, CheckCircle2, BarChart3, Settings } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const steps = [
  {
    id: 1,
    title: '1. The Analytics Dashboard',
    icon: BarChart3,
    description: 'When you first open the app, you land on the Legal & Corporate Dashboard.',
    points: [
      'Point out the KPI Cards (Total Revenue, Active Cases). Explain that these metrics are dynamically calculated from the underlying Legal Cases database.',
      'Click the Date Range Picker in the top right (e.g., "Last 7 days" vs "Last 30 days").',
      'Hover over the Revenue Chart and the Practice Area Pie Chart.',
    ],
    note: 'Behind the scenes: The charts use recharts and the data is fetched from the Next.js API route GET /api/analytics. It simulates a real backend delay to show loading skeletons.'
  },
  {
    id: 2,
    title: '2. Viewing the Case Registry',
    icon: PlayCircle,
    description: 'This is the core data table of the application, built with Clean Architecture.',
    points: [
      'Filtering: Click the "All Practice Areas" dropdown and select Corporate. Notice how the URL instantly updates to ?practiceArea=Corporate. This means filters are bookmarkable!',
      'Searching: Type a client\'s name in the search bar. The debounce hook will automatically trigger a search without needing a submit button.',
      'Sorting: Click on the Rate or Case # column headers to sort the table ascending or descending.'
    ]
  },
  {
    id: 3,
    title: '3. Deleting Data & Bulk Actions',
    icon: ShieldAlert,
    description: 'The portal supports robust bulk operations.',
    points: [
      'Click the checkboxes next to 2 or 3 cases on the left side of the table.',
      'A Bulk Actions Bar will smoothly slide in from the top.',
      'Click the red "Delete Selected" button.',
      'Watch the toast notification appear, and the table instantly refresh without the deleted cases!'
    ],
    note: 'Role-Based Access (RBAC): If you change your role in the top-right header to "Lawyer/Manager" or "Client", the Delete button will be locked. Only Administrators can delete data!'
  },
  {
    id: 4,
    title: '4. Creating a New Case (Wizard)',
    icon: Settings,
    description: 'This is the most technically complex part of the UI: a 4-step wizard with strict Zod validation.',
    points: [
      'Step 1 (Basic): Enter a client name and select a Client Type (Business vs Individual).',
      'Step 2 (Conditional Logic): Select "Real Estate" from the Practice Area. Notice how it asks for "Property Value". Now change it to "Corporate". Notice how the fields instantly change to ask for "Jurisdiction" and "License Type".',
      'Step 3 (Billing): Assign a lawyer and enter an hourly rate.',
      'Step 4 (Review): Submit the case and watch the confetti animation!'
    ],
    note: 'Draft Saving: Mention that if you accidentally close the tab during Step 3, the form data is saved in localStorage, so the user won\'t lose their progress!'
  },
  {
    id: 5,
    title: '5. Case Detail & Audit Logs',
    icon: CheckCircle2,
    description: 'Finally, show them the detailed view of a specific case.',
    points: [
      'Inline Editing: Click on the "Status" dropdown in the middle of the page and change it from "Active" to "Closed". It saves instantly via a PATCH request.',
      'Activity Timeline (Audit Log): Look at the right side of the screen. Every time you change a status, or add a note, the system creates an immutable audit log. Add a note saying "Client signed the documents" and hit enter.'
    ]
  }
];

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <PageHeader 
        title="Interactive Presentation Guide" 
        description="A self-guided walkthrough on how to demonstrate the Almahy Portal during your technical interview."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left flex items-center p-4 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : ''}`}>{step.title}</h3>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'text-blue-500 translate-x-1' : 'opacity-0 -translate-x-2'}`} />
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {steps.map((step) => {
            if (activeStep !== step.id) return null;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                  {/* Decorative background blur */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">{step.title}</h2>
                      <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">How to demo this:</h3>
                      <ul className="space-y-4">
                        {step.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed text-sm">
                              {/* Simple bolding for keywords */}
                              {point.split(':').length > 1 ? (
                                <>
                                  <strong className="text-white font-semibold">{point.split(':')[0]}:</strong>
                                  {point.split(':').slice(1).join(':')}
                                </>
                              ) : (
                                point
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.note && (
                      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                        step.note.includes('Role-Based') || step.note.includes('CAUTION')
                          ? 'bg-rose-950/30 border-rose-900/50 text-rose-200' 
                          : 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200'
                      }`}>
                        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
                        <p className="text-sm leading-relaxed font-medium">{step.note}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center relative z-10">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                    >
                      Previous Step
                    </Button>
                    <Button 
                      onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                      disabled={activeStep === steps.length}
                    >
                      {activeStep === steps.length ? 'Finish' : 'Next Step'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
