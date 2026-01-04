import { useState, useEffect, useCallback } from "react";
import { getAttendance, AttendanceRecord } from "../services/attendance";
import { useAuth } from "../context/AuthContext";

type AttendanceType = "fajr" | "maghrib-isha" | "dua";

export interface AttendanceFilters {
  date_from?: string;
  date_to?: string;
  room: string;
  student: string;
  status: string;
}

export function useAttendance(initialType: AttendanceType = "fajr") {
  const { user } = useAuth();

  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Default filters: last 30 days
  const [filters, setFilters] = useState<AttendanceFilters>({
    date_from: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0],
    date_to: new Date().toISOString().split("T")[0],
    room: "",
    student: "",
    status: "",
  });

  const [dataset, setDataset] = useState<AttendanceType>(initialType);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await getAttendance(dataset);

      // Apply filters client-side
      const filtered = records.filter((rec) => {
        const dateOk =
          (!filters.date_from ||
            new Date(rec.date ?? "").getTime() >= new Date(filters.date_from).getTime()) &&
          (!filters.date_to ||
            new Date(rec.date ?? "").getTime() <= new Date(filters.date_to).getTime());

        const roomOk =
          !filters.room ||
          (rec.room ?? "").toLowerCase().includes(filters.room.toLowerCase());

        const studentOk =
          !filters.student ||
          (rec.student_name ?? "").toLowerCase().includes(filters.student.toLowerCase());

        const statusOk =
          !filters.status ||
          (rec.status ?? "").toLowerCase() === filters.status.toLowerCase();

        return dateOk && roomOk && studentOk && statusOk;
      });

      setData(filtered);
    } catch (err: any) {
      setError(err.message || "Failed to fetch attendance data");
    } finally {
      setLoading(false);
    }
  }, [dataset, filters]);

  // Initial + dataset change fetch
  useEffect(() => {
    if (user) {
      fetchAttendance();
    }
  }, [user, dataset, fetchAttendance]);

  const updateFilters = (newFilters: Partial<AttendanceFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const refresh = () => fetchAttendance();

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refresh,
    dataset,
    setDataset,
  };
}
