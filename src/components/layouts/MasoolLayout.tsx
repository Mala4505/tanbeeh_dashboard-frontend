import FiltersBar, { DashboardFilters } from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import StudentsTable from "../tables/StudentTable";
import SkeletonCard from "../SkeletonCard";
import { DashboardResponse } from "../../api/client";
import { computeSummary, RoomsData, DailyData } from "../../utils/filterUtils";

interface MasoolLayoutProps {
  data: DashboardResponse | null;
  stats: ReturnType<typeof computeSummary> | null;
  rooms: RoomsData | null;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  daily: DailyData | null;     // ✅ filtered daily
  students: any[];             // ✅ filtered students
}

export default function MasoolLayout({
  data,
  stats,
  filters,
  onFiltersChange,
  daily,
  students,
}: MasoolLayoutProps) {
  if (!data || !stats) {
    return <SkeletonCard height="400px" />;
  }

  return (
    <div className="space-y-8">
      <FiltersBar
        role="masool"
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
        showFlagsWidget={false}
      />

      {/* Charts use filtered daily */}
      <AttendanceTrend data={daily} filters={filters} />

      {/* Tables use filtered students */}
      <StudentsTable rows={students} />
    </div>
  );
}
