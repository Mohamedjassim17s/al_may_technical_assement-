import { describe, it, expect } from 'vitest';
import globalDb from '../lib/db';

describe('Mock Database Service', () => {
  const adminActor = {
    id: 'u1',
    name: 'Test Admin',
    role: 'admin' as const
  };

  it('retrieves paginated cases correctly', () => {
    const result = globalDb.getCases({}, 1, 5);
    expect(result.data.length).toBeLessThanOrEqual(5);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.total).toBeGreaterThan(0);
  });

  it('filters cases by practice area correctly', () => {
    const result = globalDb.getCases({ practiceArea: 'Civil' }, 1, 100);
    expect(result.data.every(c => c.practiceArea === 'Civil')).toBe(true);
  });
});
