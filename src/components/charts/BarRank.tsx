import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

interface Props {
  labels: string[];
  rates: number[];
  students?: any[];
  filters: DashboardFilters;
  height?: number;
}

export default function BarRank({ labels, rates, students = [], filters, height = 300 }: Props) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    setLoading(true);
    const sliced = applyFilters(students, filters);
    setLoading(false);
    return sliced;
  }, [students, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading) return <ChartSkeleton />;

  const option = {
    animationDuration: 700,
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: labels, axisLabel: { rotate: 30 } },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: rates, itemStyle: { borderRadius: [4, 4, 0, 0] } }],
  };

  return <ReactECharts theme="minimalist" option={option} style={{ height }} />;
}
