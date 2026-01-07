import ReactECharts from "echarts-for-react";

interface Props {
  dates: string[];
  rate: number[];
  height?: number;
}

export default function LineTrend({ dates, rate, height = 300 }: Props) {
  const option = {
    animationDuration: 800,
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates, axisLine: { show: false }, axisTick: { show: false } },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "#F3F4F6" } },
    },
    series: [
      { type: "line", data: rate, smooth: true, lineStyle: { width: 2 }, areaStyle: { opacity: 0.08 } },
    ],
  };
  return <ReactECharts theme="minimalist" option={option} style={{ height }} />;
}
