export type UserRole = 'admin' | 'manager' | 'viewer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type CaseStatus = 'Active' | 'Pending' | 'Closed' | 'Draft';
export type ItemStatus = CaseStatus;
export type PracticeArea = 'Civil' | 'Corporate' | 'Real Estate' | 'Criminal' | 'Family';
export type ItemCategory = PracticeArea;
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ItemPriority = Priority;

export interface Case {
  id: string;
  caseNumber: string; // e.g., CAS-1021
  clientName: string;
  clientType: 'Individual' | 'Business';
  practiceArea: PracticeArea;
  status: CaseStatus;
  priority: Priority;
  assignedLawyer: string;
  lawyerEmail?: string;
  billableHours: number;
  hourlyRate: number;
  tags: string[];
  description: string;
  caseDetails: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  caseId: string;
  actor: {
    name: string;
    avatar?: string;
    role: string;
  };
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'NOTE';
  details: string;
  timestamp: string;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  practiceArea?: PracticeArea;
  status?: CaseStatus;
  sortBy?: keyof Case;
  sortDir?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CategoryDistribution {
  name: string;
  value: number;
  percentage?: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  expenses?: number;
}
export interface StatusBreakdown {
  name: string;
  count: number;
  percentage: number;
  color?: string;
}
