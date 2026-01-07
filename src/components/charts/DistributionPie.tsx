import React from "react";
import ReactECharts from "echarts-for-react";

interface DistributionPieProps {
  data: { labels: string[]; rates: number[] } | null;
  title: string;
  subtitle?: string;
}

export default function DistributionPie({ data, title, subtitle }: DistributionPieProps) {
  if (!data || !data.labels) {
    return <div>Loading distribution...</div>;
  }

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
