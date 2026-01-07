import React from "react";
import ReactECharts from "echarts-for-react";

interface FlaggedTrendProps {
  data: { room: string; rate: number }[] | null;
}

export default function FlaggedTrend({ data }: FlaggedTrendProps) {
  if (!data || !Array.isArray(data)) {
    return <div>Loading flagged trend...</div>;
  }

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: data.map((d) => d.room || "Unknown") },
    yAxis: { type: "value" },
    series: [
      {
        name: "Flagged Rate",
        type: "bar",
        data: data.map((d) => d.rate),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
