'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Case, PaginatedResponse, FilterParams } from '../../types';
import { ManagementTable } from '../../components/management/ManagementTable';
import { ManagementFilters } from '../../components/management/ManagementFilters';
import { TablePagination } from '../../components/management/TablePagination';
import { PageHeader } from '../../components/layout/PageHeader';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

function ManagementContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { role } = useAuth();

  const [data, setData] = useState<PaginatedResponse<Case> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const qs = searchParams.toString();
      const res = await fetch(`/api/cases${qs ? `?${qs}` : ''}`, { 
        cache: 'no-store' 
      });
      if (!res.ok) throw new Error('Failed to fetch cases');
      const json = await res.json();
      setData(json);
    } catch (err) {
      showToast('Error loading cases', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchParams, showToast]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const updateFilters = (newParams: Partial<FilterParams>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    if (!newParams.page) params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = async (ids: string[], status: string) => {
    try {
      const res = await fetch('/api/cases', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': role
        },
        body: JSON.stringify({ ids, status })
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to update');
      }
      showToast(`Successfully updated ${ids.length} case(s)`, 'success');
      fetchCases();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const res = await fetch('/api/cases', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': role
        },
        body: JSON.stringify({ ids })
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to delete');
      }
      showToast(`Successfully deleted ${ids.length} case(s)`, 'success');
      // If we deleted the last item on the page, go back a page
      if (data && data.data.length === ids.length && data.pagination.page > 1) {
        updateFilters({ page: data.pagination.page - 1 });
      } else {
        fetchCases();
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Case Management"
        description="Search, filter, and manage client cases."
        action={
          <div id="tour-new-case-btn">
            <Button onClick={() => router.push('/management/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </div>
        }
      />

      <div id="tour-management-table" className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2">
        <ManagementFilters
          currentFilters={{
            search: searchParams.get('search') || '',
            practiceArea: (searchParams.get('practiceArea') as any) || '',
            status: (searchParams.get('status') as any) || ''
          }}
          onFilterChange={updateFilters}
        />

        <ManagementTable
          data={data?.data || []}
          loading={loading}
          onSort={(sortBy, sortDir) => updateFilters({ sortBy, sortDir: sortDir as any })}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          currentSort={{
            sortBy: searchParams.get('sortBy') as any,
            sortDir: searchParams.get('sortDir') as any
          }}
        />

        {data && data.pagination.totalPages > 1 && (
          <TablePagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            totalItems={data.pagination.total}
            limit={data.pagination.limit}
            onPageChange={(page) => updateFilters({ page })}
            onLimitChange={(limit) => updateFilters({ limit: limit as any, page: 1 })}
          />
        )}
      </div>
    </div>
  );
}

export default function ManagementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 animate-pulse">Loading management portal...</div>}>
      <ManagementContent />
    </Suspense>
  );
}
