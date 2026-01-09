import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";

interface Props {
  dates: string[];
  rate: number[];
  height?: number;
}

export default function LineTrend({ dates, rate, height = 300 }: Props) {
  const [loading] = useState(false);

  if (loading || !dates?.length) return <ChartSkeleton />;

  const option = {
    animationDuration: 800,
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    series: [
      { type: "line", data: rate, smooth: true, lineStyle: { width: 2 }, areaStyle: { opacity: 0.08 } },
    ],
  };

  return <ReactECharts theme="minimalist" option={option} style={{ height }} />;
}
