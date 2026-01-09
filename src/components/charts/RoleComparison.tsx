import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

export interface RoleComparisonItem {
  role: string;
  present: number;
  absent: number;
  late: number;
  darajah?: string;
  hizb?: string;
  hizb_group?: string;
}

interface RoleComparisonProps {
  data: RoleComparisonItem[];
  filters: DashboardFilters;
}

export default function RoleComparison({ data, filters }: RoleComparisonProps) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    setLoading(true);
    const sliced = applyFilters(data, filters);
    setLoading(false);
    return sliced;
  }, [data, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !data?.length) return <ChartSkeleton />;

  const roles = filtered.map((d) => d.role);
  const present = filtered.map((d) => d.present);
  const absent = filtered.map((d) => d.absent);
  const late = filtered.map((d) => d.late);

  const option = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["Present", "Absent", "Late"], top: 30 },
    xAxis: { type: "category", data: roles },
    yAxis: { type: "value" },
    series: [
      { name: "Present", type: "bar", data: present, itemStyle: { color: "#16a34a" } },
      { name: "Absent", type: "bar", data: absent, itemStyle: { color: "#dc2626" } },
      { name: "Late", type: "bar", data: late, itemStyle: { color: "#ea580c" } },
    ],
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <h3 className="text-lg font-bold mb-2">Role Comparison</h3>
      <ReactECharts option={option} style={{ height: 350, width: "100%" }} />
    </div>
  );
}
