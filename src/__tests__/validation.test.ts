import { describe, it, expect } from 'vitest';
import { validateCase } from '../lib/validation';

describe('Case Validation', () => {
  const validCase = {
    clientName: 'Test Client',
    clientType: 'Individual',
    practiceArea: 'Civil',
    status: 'Draft',
    priority: 'Medium',
    assignedLawyer: 'John',
    billableHours: 10,
    hourlyRate: 500,
    description: 'Valid description here',
    tags: [],
    caseNumber: 'CAS-123',
    caseDetails: {}
  };

  it('validates a correct case', () => {
    const result = validateCase(validCase);
    expect(result.success).toBe(true);
  });

  it('fails if high value rate does not have high priority', () => {
    const result = validateCase({
      ...validCase,
      hourlyRate: 2500,
      priority: 'Low' // Invalid combination
    });
    expect(result.success).toBe(false);
  });

  it('fails if client name is too short', () => {
    const result = validateCase({
      ...validCase,
      clientName: 'a'
    });
    expect(result.success).toBe(false);
  });
});
