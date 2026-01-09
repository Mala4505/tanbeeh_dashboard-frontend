import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

export interface HeatmapItem {
  room: string;
  days: Record<string, number>; // e.g. { Mon: 85, Tue: 90, ... }
  darajah?: string;
  hizb?: string;
  hizb_group?: string;
}

interface AttendanceHeatmapProps {
  data: HeatmapItem[];
  filters: DashboardFilters;
}

export default function AttendanceHeatmap({ data, filters }: AttendanceHeatmapProps) {
  const [loading, setLoading] = useState(false);

  const filteredData = useMemo(() => {
    setLoading(true);
    const sliced = applyFilters(data, filters);
    setLoading(false);
    return sliced;
  }, [data, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading) return <ChartSkeleton />;

  const rooms = filteredData.map((d) => d.room);
  const days = Object.keys(filteredData[0]?.days || {});

  const values: [number, number, number][] = [];
  filteredData.forEach((roomItem, roomIndex) => {
    days.forEach((day, dayIndex) => {
      values.push([dayIndex, roomIndex, roomItem.days[day]]);
    });
  });

  const option = {
    tooltip: {
      position: "top",
      backgroundColor: "hsl(var(--card))",
      borderColor: "hsl(var(--border))",
      borderWidth: 1,
      textStyle: { color: "hsl(var(--foreground))" },
      formatter: (params: any) =>
        `${days[params.value[0]]} - ${rooms[params.value[1]]}: ${params.value[2]}%`,
    },
    grid: { height: "70%", top: "10%" },
    xAxis: { type: "category", data: days },
    yAxis: { type: "category", data: rooms },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0",
      inRange: { color: ["#dc2626", "#facc15", "#16a34a"] },
    },
    series: [{ name: "Attendance %", type: "heatmap", data: values }],
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <h3 className="text-lg font-bold mb-2">Attendance Heatmap</h3>
      <ReactECharts option={option} style={{ height: 400, width: "100%" }} />
    </div>
  );
}
