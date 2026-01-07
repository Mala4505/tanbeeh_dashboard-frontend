import ReactECharts from "echarts-for-react";

interface Props {
  weeks: string[];
  present: number[];
  absent: number[];
  late: number[];
  height?: number;
}

export default function StackedWeekly({ weeks, present, absent, late, height = 300 }: Props) {
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
