import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

interface DistributionPieProps {
  data: { labels: string[]; rates: number[]; students?: any[] } | null;
  title: string;
  subtitle?: string;
  filters: DashboardFilters;
}

export default function DistributionPie({ data, title, subtitle, filters }: DistributionPieProps) {
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (!data?.students) return [];
    setLoading(true);
    const sliced = applyFilters(data.students, filters);
    setLoading(false);
    return sliced;
  }, [data?.students, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !data || !data.labels) return <ChartSkeleton />;

  const option = {
    title: { text: title, subtext: subtitle, left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Utilization",
        type: "pie",
        radius: "50%",
        data: data.labels.map((label, i) => ({
          name: label,
          value: data.rates[i],
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
