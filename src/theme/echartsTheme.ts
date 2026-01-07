import * as echarts from "echarts";

export const minimalistTheme = {
  color: ["#3B82F6", "#10B981", "#EF4444", "#F59E0B"],
  textStyle: { fontFamily: "Inter, system-ui, sans-serif", color: "#111827" },
  axisPointer: { lineStyle: { color: "#9CA3AF" } },
  grid: { left: 40, right: 24, top: 24, bottom: 40 },
};

echarts.registerTheme("minimalist", minimalistTheme);
