import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

interface AttendanceTrendProps {
  data: {
    dates: string[];
    present: number[];
    absent: number[];
    late: number[];
    rate: number[];
    students?: any[];
  } | null;
  filters: DashboardFilters;
}

export default function AttendanceTrend({ data, filters }: AttendanceTrendProps) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (!data?.students) return [];
    setLoading(true);
    const sliced = applyFilters(data.students, filters);
    setLoading(false);
    return sliced;
  }, [data?.students, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !data || !data.dates) return <ChartSkeleton />;

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Present", "Absent", "Late"] },
    xAxis: { type: "category", data: data.dates },
    yAxis: { type: "value" },
    series: [
      { name: "Present", type: "line", data: data.present },
      { name: "Absent", type: "line", data: data.absent },
      { name: "Late", type: "line", data: data.late },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
