import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FiltersBar, { DashboardFilters } from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import FlaggedTrend from "../charts/FlaggedTrend";
import DistributionPie from "../charts/DistributionPie";
import RoomUtilization from "../charts/RoomUtilization";
import StudentsTable from "../tables/StudentTable";
import FlaggedTable from "../tables/FlaggedTable";
import {
  DashboardResponse,
  approveFlag,
  rejectFlag,
  removeFlag,
  addFlagFeedback,
} from "../../api/client";
import SkeletonCard from "../SkeletonCard";
import { Flag } from "../../types/students";
import { UserRole } from "@/lib/auth";
import { computeSummary, RoomsData, DailyData } from "../../utils/filterUtils";

interface AdminLayoutProps {
  data: DashboardResponse | null;
  rooms: RoomsData | null;
  stats: ReturnType<typeof computeSummary> | null;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  daily: DailyData | null;     // ✅ filtered daily
  students: any[];             // ✅ filtered students
  flagged: any[];              // ✅ filtered flagged
}

function isUserRole(value: any): value is UserRole {
  return ["admin", "prefect", "lajnat_member"].includes(value);
}

export default function AdminLayout({
  data,
  stats,
  rooms,
  filters,
  onFiltersChange,
  daily,
  students,
  flagged,
}: AdminLayoutProps) {
  const { user } = useAuth();
  const [flags, setFlags] = useState<Flag[]>(flagged ?? []);

  const handleApprove = async (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "approved" } : f)));
    try { await approveFlag(id); } catch {
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "requested" } : f)));
    }
  };

  const handleReject = async (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "rejected" } : f)));
    try { await rejectFlag(id); } catch {
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "requested" } : f)));
    }
  };

  const handleRemove = async (id: string) => {
    const oldFlags = flags;
    setFlags((prev) => prev.filter((f) => f.id !== id));
    try { await removeFlag(id); } catch { setFlags(oldFlags); }
  };

  const handleFeedback = async (id: string, feedback: string) => {
    try { await addFlagFeedback(id, feedback); } catch (err) { console.error("Feedback failed", err); }
  };

  if (!data || !stats) {
    return (
      <div className="space-y-8">
        <SkeletonCard height="40px" />
        <div className="grid grid-cols-6 gap-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
        <SkeletonCard height="400px" />
        <SkeletonCard height="400px" />
        <SkeletonCard height="400px" />
        <SkeletonCard height="300px" />
        <SkeletonCard height="300px" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FiltersBar
        role="admin"
        onApply={onFiltersChange}
        darajahOptions={data.meta.options?.darajah ?? []}
        hizbOptions={data.meta.options?.hizb ?? []}
        hizbGroupOptions={data.meta.options?.hizb_group ?? []}
        initialFrom={data.meta.range.start}
        initialTo={data.meta.range.end}
      />

      <CardsSummary
        totalStudents={stats.totalStudents}
        presentRateDaily={stats.presentRateDaily}
        absentRateDaily={stats.absentRateDaily}
        presentRateOverall={stats.presentRateOverall}
        absentRateOverall={stats.absentRateOverall}
        flaggedCount={stats.flaggedCount}
        showFlagsWidget={true}
      />

      {/* Charts use filtered props */}
      <AttendanceTrend data={daily} filters={filters} />
      <FlaggedTrend data={flagged} filters={filters} />
      <DistributionPie data={rooms} filters={filters} title="Room Utilization" subtitle="Rates by room" />
      <RoomUtilization data={rooms} filters={filters} />

      {/* Tables use filtered props */}
      <StudentsTable rows={students} />
      <FlaggedTable
        rows={flags}
        role={isUserRole(user?.role) ? user.role : "admin"}
        onApprove={handleApprove}
        onReject={handleReject}
        onRemove={handleRemove}
        onFeedback={(id) => handleFeedback(id, "Needs review")}
      />
    </div>
  );
}
