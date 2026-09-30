import React, { useState, useEffect } from 'react';
import { FilterParams } from '../../types';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

interface ManagementFiltersProps {
  currentFilters: Partial<FilterParams>;
  onFilterChange: (filters: Partial<FilterParams>) => void;
}

export function ManagementFilters({ currentFilters, onFilterChange }: ManagementFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentFilters.search) {
        onFilterChange({ search: searchTerm });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, currentFilters.search, onFilterChange]);

  return (
    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text"
          placeholder="Search clients or case numbers..."
          className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <select
          className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 flex-1 md:w-48"
          value={currentFilters.practiceArea || ''}
          onChange={(e) => onFilterChange({ practiceArea: e.target.value as any })}
        >
          <option value="">All Practice Areas</option>
          <option value="Civil">Civil</option>
          <option value="Corporate">Corporate</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Criminal">Criminal</option>
          <option value="Family">Family</option>
        </select>

        <select
          className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 flex-1 md:w-40"
          value={currentFilters.status || ''}
          onChange={(e) => onFilterChange({ status: e.target.value as any })}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
    </div>
  );
}
