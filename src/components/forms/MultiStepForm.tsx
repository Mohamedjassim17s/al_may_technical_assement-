'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { caseSchema, CaseFormData } from '../../lib/validation';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2CaseDetails } from './Step2CaseDetails';
import { Step3Billing } from './Step3Billing';
import { Step4ReviewSubmit } from './Step4ReviewSubmit';

const STEPS = ['Basic Info', 'Details', 'Billing', 'Review'];

export function MultiStepForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { role } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema) as any,
    defaultValues: {
      clientName: '',
      clientType: 'Business',
      caseNumber: '',
      practiceArea: 'Corporate',
      status: 'Draft',
      priority: 'Medium',
      assignedLawyer: '',
      lawyerEmail: '',
      billableHours: 0,
      hourlyRate: 0,
      description: '',
      tags: [],
      caseDetails: {}
    }
  });

  // Autosave Draft to LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('case_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e) { }
    }

    const subscription = form.watch((value) => {
      localStorage.setItem('case_draft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Periodic autosave toast
  useEffect(() => {
    const interval = setInterval(() => {
      if (form.formState.isDirty) {
        showToast(`Draft saved ${new Date().toLocaleTimeString()}`, 'info');
      }
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [form.formState.isDirty, showToast]);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ['clientName', 'caseNumber', 'clientType', 'practiceArea', 'description'];
    if (currentStep === 1) fieldsToValidate = ['tags'];
    if (currentStep === 2) fieldsToValidate = ['assignedLawyer', 'lawyerEmail', 'status', 'priority', 'billableHours', 'hourlyRate'];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: CaseFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': role
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to create case');

      localStorage.removeItem('case_draft');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast('Case created successfully!', 'success');

      setTimeout(() => {
        router.push('/management');
      }, 1500);
    } catch (err) {
      showToast('Failed to create case. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="tour-wizard" className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-6">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${idx < currentStep ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' :
                  idx === currentStep ? 'bg-purple-500 ring-4 ring-purple-500/20 text-white' :
                    'bg-slate-200 text-slate-500'
                }`}>
                {idx + 1}
              </div>
              <span className={`text-xs mt-2 font-bold ${idx <= currentStep ? 'text-slate-800' : 'text-slate-400'
                }`}>{step}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1.5 bg-slate-200 mt-4 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="min-h-[300px]">
            {currentStep === 0 && <Step1BasicInfo form={form} />}
            {currentStep === 1 && <Step2CaseDetails form={form} />}
            {currentStep === 2 && <Step3Billing form={form} />}
            {currentStep === 3 && <Step4ReviewSubmit form={form} />}
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button type="submit" isLoading={isSubmitting}>
                Create Case
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
