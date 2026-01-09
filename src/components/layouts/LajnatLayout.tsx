import { useAuth } from "../../context/AuthContext";
import FiltersBar, { DashboardFilters } from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import FlaggedTrend from "../charts/FlaggedTrend";
import DistributionPie from "../charts/DistributionPie";
import ApprovalsTable from "../tables/ApprovalsTable";
import FlaggedTable from "../tables/FlaggedTable";
import StudentsTable from "../tables/StudentTable"; // ✅ if you want to show students
import SkeletonCard from "../SkeletonCard";
import {
  DashboardResponse,
  approveFlag,
  rejectFlag,
  removeFlag,
  addFlagFeedback,
} from "../../api/client";
import { computeSummary, RoomsData, DailyData } from "../../utils/filterUtils";

interface LajnatLayoutProps {
  data: DashboardResponse | null;
  stats: ReturnType<typeof computeSummary> | null;
  rooms: RoomsData | null;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  daily: DailyData | null;
  flagged: any[];
  students: any[];   // ✅ added
}

export default function LajnatLayout({
  data,
  stats,
  rooms,
  filters,
  onFiltersChange,
  daily,
  flagged,
  students,
}: LajnatLayoutProps) {
  const { user } = useAuth();

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
        role="lajnat_member"
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

      {/* Tables */}
      <ApprovalsTable
        rows={flagged}
        onApprove={approveFlag}
        onReject={rejectFlag}
        onFeedback={(id) => addFlagFeedback(id, "Reviewed by Lajnat")}
      />

      <FlaggedTable
        rows={flagged}
        role={user?.role ?? "lajnat_member"}
        onApprove={approveFlag}
        onReject={rejectFlag}
        onRemove={removeFlag}
        onFeedback={(id) => addFlagFeedback(id, "Needs review")}
      />

      {/* Optional: show students if needed */}
      <StudentsTable rows={students} />
    </div>
  );
}
