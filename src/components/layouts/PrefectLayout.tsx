import FiltersBar, { DashboardFilters } from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import DistributionPie from "../charts/DistributionPie";
import RoomUtilization from "../charts/RoomUtilization";
import FlaggedTrend from "../charts/FlaggedTrend";
import StudentsTable from "../tables/StudentTable";
import SkeletonCard from "../SkeletonCard";
import { DashboardResponse } from "../../api/client";
import { computeSummary, RoomsData, DailyData } from "../../utils/filterUtils";

interface PrefectLayoutProps {
  data: DashboardResponse | null;
  stats: ReturnType<typeof computeSummary> | null;
  rooms: RoomsData | null;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  daily: DailyData | null;     // ✅ filtered daily passed from Dashboard
  students: any[];             // ✅ filtered students
  flagged: any[];              // ✅ filtered flagged
}

export default function PrefectLayout({
  data,
  stats,
  rooms,
  filters,
  onFiltersChange,
  daily,
  students,
  flagged,
}: PrefectLayoutProps) {
  if (!data || !stats) {
    return (
      <div className="space-y-8">
        <SkeletonCard height="40px" />
        <SkeletonCard height="400px" />
        <SkeletonCard height="400px" />
        <SkeletonCard height="400px" />
        <SkeletonCard height="300px" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FiltersBar
        role="prefect"
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
        showFlagsWidget={stats.flaggedCount !== undefined}
      />

      {/* Charts use filtered props */}
      <AttendanceTrend data={daily} filters={filters} />
      <DistributionPie
        data={rooms}
        filters={filters}
        title="Room Distribution"
        subtitle="Rates by room"
      />
      <RoomUtilization data={rooms} filters={filters} />
      <FlaggedTrend data={flagged} filters={filters} />

      {/* Table uses filtered students */}
      <StudentsTable rows={students} />
    </div>
  );
}
