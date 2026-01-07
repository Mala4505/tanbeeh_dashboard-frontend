import FiltersBar from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import StudentsTable from "../tables/StudentTable";
import SkeletonCard from "../SkeletonCard";
import { DashboardResponse } from "../../api/client";

interface DeputyLayoutProps {
  data: DashboardResponse | null;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export default function DeputyLayout({ data, filters, onFiltersChange }: DeputyLayoutProps) {
  if (!data || !data.summary) {
    return (
      <div className="space-y-8">
        <SkeletonCard height="40px" /> {/* FiltersBar */}
        <div className="grid grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard height="400px" /> {/* AttendanceTrend */}
        <SkeletonCard height="300px" /> {/* StudentsTable */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <FiltersBar
        role="deputy"
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
        showFlagsWidget={false}
      />

      {/* Charts */}
      <AttendanceTrend data={data.daily ?? null} />

      {/* Tables */}
      <StudentsTable rows={data.students ?? []} />
    </div>
  );
}
