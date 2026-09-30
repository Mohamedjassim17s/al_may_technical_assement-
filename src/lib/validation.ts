import { z } from 'zod';

export const caseSchema = z.object({
  clientName: z.string().min(2, 'Client Name is required'),
  clientType: z.enum(['Individual', 'Business'], { errorMap: () => ({ message: 'Please select client type' }) }),
  practiceArea: z.enum(['Civil', 'Corporate', 'Real Estate', 'Criminal', 'Family'], { errorMap: () => ({ message: 'Please select a practice area' }) }),
  status: z.enum(['Draft', 'Active', 'Pending', 'Closed']),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  assignedLawyer: z.string().min(2, 'Assigned Lawyer is required'),
  lawyerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  billableHours: z.coerce.number().min(0, 'Cannot be negative'),
  hourlyRate: z.coerce.number().min(0, 'Cannot be negative'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tags: z.array(z.string()).default([]),
  caseNumber: z.string().min(3, 'Case number required'),
  caseDetails: z.record(z.string()).default({})
}).refine(data => {
  // Conditional validation
  if (data.hourlyRate > 2000 && data.priority !== 'Critical' && data.priority !== 'High') {
    return false;
  }
  return true;
}, {
  message: 'High value cases (>$2000/hr) must have High or Critical priority',
  path: ['priority']
});

export type CaseFormData = z.infer<typeof caseSchema>;

export function validateCase(data: unknown) {
  return caseSchema.safeParse(data);
}
