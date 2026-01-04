import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { AttendanceFilters } from '../utils/types';
import { Filter, X } from 'lucide-react';
interface FiltersPanelProps {
  filters: AttendanceFilters;
  onUpdate: (filters: Partial<AttendanceFilters>) => void;
  onClear: () => void;
}
export function FiltersPanel({
  filters,
  onUpdate,
  onClear
}: FiltersPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    onUpdate({
      [name]: value
    });
  };
  return <Card className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="w-full md:w-1/4">
          <Input type="date" label="From Date" name="date_from" value={filters.date_from || ''} onChange={handleChange} />
        </div>
        <div className="w-full md:w-1/4">
          <Input type="date" label="To Date" name="date_to" value={filters.date_to || ''} onChange={handleChange} />
        </div>
        <div className="w-full md:w-1/4">
          <Input label="Student Name" name="student" placeholder="Search student..." value={filters.student || ''} onChange={handleChange} />
        </div>
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select name="status" value={filters.status || ''} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cerulean focus:ring-cerulean sm:text-sm p-2 border">
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Excused">Excused</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <Button variant="ghost" size="sm" onClick={onClear} className="text-gray-500">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
        <Button variant="primary" size="sm" onClick={() => {}}>
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </Card>;
}