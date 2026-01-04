// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAttendance, AttendanceRecord } from "../services/attendance";
import { DashboardOverview } from "../components/DashboardOverview";
import { FiltersPanel } from "../components/FiltersPanel";
import { AttendanceCharts } from "../components/AttendanceCharts";
import { FlagHighlights } from "../components/FlagHighlights";
import { AttendanceTable } from "../components/AttendanceTable";
import { ChartSkeleton } from "../components/ChartSkeleton";
import { Spinner } from "../components/ui/Spinner";
import { AttendanceFilters } from "../hooks/useAttendance"; // ✅ use canonical type

export function Dashboard() {
  const { user } = useAuth();

  const [data, setData] = useState<AttendanceRecord[]>([]); // ✅ plain array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AttendanceFilters>({
    date_from: undefined,
    date_to: undefined,
    room: "",
    student: "",
    status: "",
  });
  const [dataset, setDataset] = useState<"fajr" | "maghrib-isha" | "dua">("fajr");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await getAttendance(dataset);
      setData(records); // ✅ matches state type
    } catch (err: any) {
      setError(err.message || "Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataset]);

  const updateFilters = (newFilters: Partial<AttendanceFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const refresh = () => {
    fetchData();
  };

  const handleClearFilters = () => {
    setFilters({
      date_from: undefined,
      date_to: undefined,
      room: "",
      student: "",
      status: "",
    });
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-darkTeal">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold text-cerulean">{user?.name}</span>
        </div>
      </div>

      {/* Dataset Selector */}
      <div className="flex space-x-4">
        {["fajr", "maghrib-isha", "dua"].map((type) => (
          <button
            key={type}
            onClick={() => setDataset(type as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              dataset === type
                ? "bg-cerulean text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "fajr"
              ? "Fajr"
              : type === "maghrib-isha"
              ? "Maghrib–Isha"
              : "Du’a"}
          </button>
        ))}
      </div>

      {/* Overview */}
      <DashboardOverview data={data} />

      {/* Filters */}
      <FiltersPanel
        filters={filters}
        onUpdate={updateFilters}
        onClear={handleClearFilters}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6">
          Error loading data: {error}
          <button onClick={refresh} className="ml-4 underline">
            Retry
          </button>
        </div>
      )}

      {/* Flag Highlights */}
      <FlagHighlights data={data} />

      {/* Charts */}
      {loading ? <ChartSkeleton /> : <AttendanceCharts data={data} />}

      {/* Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-darkTeal mb-4">
          Recent Attendance Records
        </h2>
        <AttendanceTable data={data} />
      </div>
    </div>
  );
}
