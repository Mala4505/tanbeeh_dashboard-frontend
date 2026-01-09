import FiltersBar, { DashboardFilters } from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import BarRank from "../charts/BarRank";
import RoomUtilization from "../charts/RoomUtilization";
import DistributionPie from "../charts/DistributionPie";
import StudentsTable from "../tables/StudentTable";
import SkeletonCard from "../SkeletonCard";
import { DashboardResponse } from "../../api/client";
import { computeSummary, RoomsData, DailyData } from "../../utils/filterUtils";

interface MuaddibLayoutProps {
  data: DashboardResponse | null;
  stats: ReturnType<typeof computeSummary> | null;
  rooms: RoomsData | null;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  daily: DailyData | null;     // ✅ filtered daily
  students: any[];             // ✅ filtered students
}

export default function MuaddibLayout({
  data,
  stats,
  rooms,
  filters,
  onFiltersChange,
  daily,
  students,
}: MuaddibLayoutProps) {
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
        role="muaddib"
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

      {/* Charts use filtered daily + rooms */}
      <AttendanceTrend data={daily} filters={filters} />
      <BarRank
        labels={rooms?.labels ?? []}
        rates={rooms?.rates ?? []}
        students={students}
        filters={filters}
      />
      <RoomUtilization data={rooms} filters={filters} />
      <DistributionPie
        data={rooms}
        filters={filters}
        title="Room Distribution"
        subtitle="Rates by room"
      />

      {/* Tables use filtered students */}
      <StudentsTable rows={students} />
    </div>
  );
}
