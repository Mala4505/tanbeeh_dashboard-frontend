import React from 'react';
import { useAttendance } from '../hooks/useAttendance';
import { DashboardOverview } from '../components/DashboardOverview';
import { FiltersPanel } from '../components/FiltersPanel';
import { AttendanceCharts } from '../components/AttendanceCharts';
import { FlagHighlights } from '../components/FlagHighlights';
import { AttendanceTable } from '../components/AttendanceTable';
import { useAuth } from '../hooks/useAuth';
export function DashboardPage() {
  const {
    user
  } = useAuth();
  const {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refresh
  } = useAttendance();
  const handleClearFilters = () => {
    updateFilters({
      date_from: undefined,
      date_to: undefined,
      room: '',
      student: '',
      status: ''
    });
  };
  if (loading && data.length === 0) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean"></div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-darkTeal">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back,{' '}
          <span className="font-semibold text-cerulean">{user?.name}</span>
        </div>
      </div>

      <DashboardOverview data={data} />

      <FiltersPanel filters={filters} onUpdate={updateFilters} onClear={handleClearFilters} />

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6">
          Error loading data: {error}
          <button onClick={refresh} className="ml-4 underline">
            Retry
          </button>
        </div>}

      <FlagHighlights data={data} />

      <AttendanceCharts data={data} />

      <div className="mt-8">
        <h2 className="text-xl font-bold text-darkTeal mb-4">
          Recent Attendance Records
        </h2>
        <AttendanceTable data={data} />
      </div>
    </div>;
}