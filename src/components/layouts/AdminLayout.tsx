import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FiltersBar from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import FlaggedTrend from "../charts/FlaggedTrend";
import DistributionPie from "../charts/DistributionPie";
// If RoomUtilization expects a different shape than `rooms`, either adapt it or show a skeleton.
// import RoomUtilization from "../charts/RoomUtilization";
import StudentsTable from "../tables/StudentTable";
import FlaggedTable from "../tables/FlaggedTable";
import {
  DashboardResponse,
  approveFlag,
  rejectFlag,
  removeFlag,
  addFlagFeedback,
} from "../../api/client";
import SkeletonCard from "../SkeletonCard"; // generic skeleton component
import { Flag } from "../../types/students";
import { UserRole } from "@/lib/auth";

interface AdminLayoutProps {
  data: DashboardResponse | null;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

function isUserRole(value: any): value is UserRole {
  return ["admin", "prefect", "lajnat_member"].includes(value);
}

export default function AdminLayout({ data, filters, onFiltersChange }: AdminLayoutProps) {
  const { user } = useAuth();

  // Optimistic flags state; guard if flags are optional/missing
  const [flags, setFlags] = useState<Flag[]>(data?.flags ?? []);

  const handleApprove = async (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "approved" } : f)));
    try {
      await approveFlag(id);
    } catch {
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "requested" } : f)));
    }
  };

  const handleReject = async (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "rejected" } : f)));
    try {
      await rejectFlag(id);
    } catch {
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status: "requested" } : f)));
    }
  };

  const handleRemove = async (id: string) => {
    const oldFlags = flags;
    setFlags((prev) => prev.filter((f) => f.id !== id));
    try {
      await removeFlag(id);
    } catch {
      setFlags(oldFlags); // rollback
    }
  };

  const handleFeedback = async (id: string, feedback: string) => {
    try {
      await addFlagFeedback(id, feedback);
    } catch (err) {
      console.error("Feedback failed", err);
    }
  };

  // Skeleton while loading or if summary missing
  if (!data || !data.summary) {
    return (
      <div className="space-y-8">
        <SkeletonCard height="40px" /> {/* FiltersBar */}
        <div className="grid grid-cols-5 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard height="400px" /> {/* AttendanceTrend */}
        <SkeletonCard height="400px" /> {/* FlaggedTrend */}
        <SkeletonCard height="400px" /> {/* DistributionPie */}
        <SkeletonCard height="300px" /> {/* StudentsTable */}
        <SkeletonCard height="300px" /> {/* FlaggedTable */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <FiltersBar
        role="admin"
        onApply={onFiltersChange}
        darajahOptions={data.meta.options?.darajah ?? []}
        hizbOptions={data.meta.options?.hizb ?? []}
        hizbGroupOptions={data.meta.options?.hizb_group ?? []}
      />

      {/* Summary Cards */}
      <CardsSummary
        totalStudents={data.summary.totalStudents}
        presentRate={data.summary.presentRate}
        absentRate={data.summary.absentRate}
        lateRate={data.summary.lateRate}
        flaggedCount={data.summary.flaggedCount}
        showFlagsWidget={true}
      />

      {/* Charts (aligned to backend payload) */}
      <AttendanceTrend data={data.daily ?? null} />
      <FlaggedTrend data={data.flagged ?? null} />
      <DistributionPie
        data={data.rooms ?? null}
        title="Room Utilization"
        subtitle="Rates by room"
      />
      {/* If you want RoomUtilization separate and it expects a different schema, either adapt or guard it:
      {data.rooms ? <RoomUtilization data={data.rooms} /> : <SkeletonCard height="400px" />}
      */}

      {/* Tables */}
      <StudentsTable rows={data.students ?? []} />

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
