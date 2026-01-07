import { useAuth } from "../../context/AuthContext";
import FiltersBar from "../FiltersBar";
import CardsSummary from "../CardsSummary";
import AttendanceTrend from "../charts/AttendanceTrend";
import FlaggedTrend from "../charts/FlaggedTrend";
import DistributionPie from "../charts/DistributionPie";
import ApprovalsTable from "../tables/ApprovalsTable";
import FlaggedTable from "../tables/FlaggedTable";
import SkeletonCard from "../SkeletonCard";
import {
  DashboardResponse,
  approveFlag,
  rejectFlag,
  removeFlag,
  addFlagFeedback,
} from "../../api/client";

interface LajnatLayoutProps {
  data: DashboardResponse | null;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export default function LajnatLayout({ data, filters, onFiltersChange }: LajnatLayoutProps) {
  const { user } = useAuth();

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
        <SkeletonCard height="300px" /> {/* ApprovalsTable */}
        <SkeletonCard height="300px" /> {/* FlaggedTable */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <FiltersBar
        role="lajnat_member"
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

      {/* Tables */}
      <ApprovalsTable
        rows={data.flags ?? []} // approvals table expects flag items; guard optional
        onApprove={approveFlag}
        onReject={rejectFlag}
        onFeedback={(id) => addFlagFeedback(id, "Reviewed by Lajnat")}
      />

      <FlaggedTable
        rows={data.flags ?? []}
        role={user?.role ?? "lajnat_member"}
        onApprove={approveFlag}
        onReject={rejectFlag}
        onRemove={removeFlag}
        onFeedback={(id) => addFlagFeedback(id, "Needs review")}
      />
    </div>
  );
}
