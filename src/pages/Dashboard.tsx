import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../api/client";
import AdminLayout from "../components/layouts/AdminLayout";
import PrefectLayout from "../components/layouts/PrefectLayout";
import DeputyLayout from "../components/layouts/DeputyLayout";
import MasoolLayout from "../components/layouts/MasoolLayout";
import MuaddibLayout from "../components/layouts/MuaddibLayout";
import LajnatLayout from "../components/layouts/LajnatLayout";
import { Spinner } from "../components/ui/Spinner";
import { Download } from "lucide-react";
import { exportDashboardData } from "../lib/excel";
import { DashboardFilters } from "../components/FiltersBar";



export function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<DashboardFilters>({
    from: "",
    to: "",
    darajah: null,
    hizb: null,
    hizb_group: null,
  });

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!user?.role) return;
    setLoading(true);
    setError(null);
    getDashboard(user.role, filters)
      .then((res) => {
        setData(res);
        setStats(res.summary);
      })
      .catch((err) => setError(err.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [user?.role, filters]);

  const handleExport = () => {
    if (!stats) return;
    const studentsData = (data?.students || []).map((s: any) => ({
      ID: s.id,
      Name: s.name,
      Room: s.room,
      Status: s.status,
      "Last Attendance": s.lastAttendance,
    }));
    const flagsData = (data?.flags || []).map((f: any) => ({
      ID: f.id,
      "Student Name": f.studentName,
      Room: f.room,
      Reason: f.reason,
      Date: f.date,
      Status: f.status,
    }));
    exportDashboardData(stats, data.daily, studentsData, flagsData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive">
        Error loading dashboard: {error}
      </div>
    );
  }

  if (!data) {
    return <div className="text-destructive">No dashboard data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
        {user?.role === "admin" && (
          <AdminLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
        {user?.role === "prefect" && (
          <PrefectLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
        {user?.role === "deputy" && (
          <DeputyLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
        {user?.role === "masool" && (
          <MasoolLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
        {user?.role === "muaddib" && (
          <MuaddibLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
        {user?.role === "lajnat_member" && (
          <LajnatLayout data={data} filters={filters} onFiltersChange={setFilters} />
        )}
      </div>
    </div>
  );
}
