import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

interface FlaggedTrendProps {
  data: { room: string; rate: number; darajah?: string; hizb?: string; hizb_group?: string }[] | null;
  filters: DashboardFilters;
}

export default function FlaggedTrend({ data, filters }: FlaggedTrendProps) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (!data) return [];
    setLoading(true);
    const sliced = applyFilters(data, filters);
    setLoading(false);
    return sliced;
  }, [data, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !Array.isArray(data)) return <ChartSkeleton />;

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: filtered.map((d) => d.room || "Unknown") },
    yAxis: { type: "value" },
    series: [
      {
        name: "Flagged Rate",
        type: "bar",
        data: filtered.map((d) => d.rate),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
