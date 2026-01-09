import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

interface Props {
  weeks: string[];
  present: number[];
  absent: number[];
  late: number[];
  students?: any[];
  filters: DashboardFilters;
  height?: number;
}

export default function StackedWeekly({ weeks, present, absent, late, students = [], filters, height = 300 }: Props) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    setLoading(true);
    const sliced = applyFilters(students, filters);
    setLoading(false);
    return sliced;
  }, [students, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !weeks?.length) return <ChartSkeleton />;

  const option = {
    animationDuration: 700,
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    xAxis: { type: "category", data: weeks },
    yAxis: { type: "value" },
    series: [
      { name: "Present", type: "bar", stack: "total", data: present },
      { name: "Absent", type: "bar", stack: "total", data: absent },
      { name: "Late", type: "bar", stack: "total", data: late },
    ],
  };

  return <ReactECharts theme="minimalist" option={option} style={{ height }} />;
}
