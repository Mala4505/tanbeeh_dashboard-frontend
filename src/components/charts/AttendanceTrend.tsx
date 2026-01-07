import React from "react";
import ReactECharts from "echarts-for-react";

interface AttendanceTrendProps {
  data: {
    dates: string[];
    present: number[];
    absent: number[];
    late: number[];
    rate: number[];
  } | null;
}

export default function AttendanceTrend({ data }: AttendanceTrendProps) {
  if (!data || !data.dates) {
    return <div>Loading attendance trend...</div>;
  }

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
