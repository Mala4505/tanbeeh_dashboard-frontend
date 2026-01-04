import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { AttendanceRecord, AttendanceFilters } from '../utils/types';
import { useAuth } from './useAuth';
export function useAttendance() {
  const {
    user
  } = useAuth();
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Default filters
  const [filters, setFilters] = useState<AttendanceFilters>({
    date_from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    // Last 30 days
    date_to: new Date().toISOString().split('T')[0]
  });
  const fetchAttendance = useCallback(async (currentFilters: AttendanceFilters) => {
    setLoading(true);
    setError(null);
    try {
      const records = await api.getAttendance(currentFilters);
      setData(records);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch attendance data');
      // For development/demo if API fails, we might want to return empty array or mock
      // setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchAttendance(filters);
    }
  }, [user, fetchAttendance]); // Removed filters from dependency to prevent loops, explicit refetch needed

  const updateFilters = (newFilters: Partial<AttendanceFilters>) => {
    const updated = {
      ...filters,
      ...newFilters
    };
    setFilters(updated);
    fetchAttendance(updated);
  };
  const refresh = () => fetchAttendance(filters);
  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refresh
  };
}