import FiltersBar from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import StudentsTable from "../tables/StudentTable";
import SkeletonCard from "../SkeletonCard";
import { DashboardResponse } from "../../api/client";

interface MasoolLayoutProps {
  data: DashboardResponse | null;
  onFiltersChange: (filters: any) => void;
}

export default function MasoolLayout({ data, onFiltersChange }: MasoolLayoutProps) {
  if (!data || !data.summary) {
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
      />

      <CardsSummary {...data.summary} showFlagsWidget={false} />
      <AttendanceTrend data={data.daily ?? null} />
      <StudentsTable rows={data.students ?? []} />
    </div>
  );
}
