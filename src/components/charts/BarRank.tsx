import ReactECharts from "echarts-for-react";

interface Props {
  labels: string[];
  rates: number[];
  height?: number;
}

export default function BarRank({ labels, rates, height = 300 }: Props) {
  const option = {
    animationDuration: 700,
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: labels, axisLabel: { rotate: 30 } },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: rates, itemStyle: { borderRadius: [4, 4, 0, 0] } }],
  };
  return <ReactECharts theme="minimalist" option={option} style={{ height }} />;
}
