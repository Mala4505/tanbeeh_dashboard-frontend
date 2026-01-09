import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartSkeleton } from "../ChartSkeleton";
import { applyFilters } from "../../utils/filterUtils";
import { DashboardFilters } from "../FiltersBar";

// Simple shape
export interface RoomsData {
  labels: string[];
  rates: number[];
}

// Extended shape
export interface RoomUtilizationItem {
  room: string;
  capacity: number;
  occupied: number;
  utilization: number; // percentage (0–100)
  darajah?: string;
  hizb?: string;
  hizb_group?: string;
}

interface RoomUtilizationProps {
  data: RoomsData | RoomUtilizationItem[] | null;
  filters: DashboardFilters;
}

export default function RoomUtilization({ data, filters }: RoomUtilizationProps) {
  const [loading, setLoading] = useState(false);

  // Case 1: extended array of objects
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    setLoading(true);
    const sliced = applyFilters(data, filters);
    setLoading(false);
    return sliced;
  }, [data, filters.darajah, filters.hizb, filters.hizb_group]);

  if (loading || !data) return <ChartSkeleton />;

  // Extended shape
  if (Array.isArray(data)) {
    if (filteredData.length === 0) return <ChartSkeleton />;

    const option = {
      title: {
        text: "Room Utilization",
        subtext: "Capacity vs Occupied with Utilization %",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: any) => {
          const cap = params.find((p: any) => p.seriesName === "Capacity")?.value;
          const occ = params.find((p: any) => p.seriesName === "Occupied")?.value;
          const util = params.find((p: any) => p.seriesName === "Utilization %")?.value;
          return `
            Room: ${params[0].name}<br/>
            Capacity: ${cap}<br/>
            Occupied: ${occ}<br/>
            Utilization: ${util}%
          `;
        },
      },
      legend: { data: ["Capacity", "Occupied", "Utilization %"], top: 30 },
      xAxis: {
        type: "category",
        data: filteredData.map((d) => d.room),
        axisLabel: { rotate: 45 },
      },
      yAxis: [
        { type: "value", name: "Students" },
        { type: "value", name: "Utilization %", min: 0, max: 100 },
      ],
      series: [
        {
          name: "Capacity",
          type: "bar",
          data: filteredData.map((d) => d.capacity),
          itemStyle: { color: "#9CA3AF" },
        },
        {
          name: "Occupied",
          type: "bar",
          data: filteredData.map((d) => d.occupied),
          itemStyle: { color: "#4F46E5" },
        },
        {
          name: "Utilization %",
          type: "line",
          yAxisIndex: 1,
          data: filteredData.map((d) => d.utilization),
          itemStyle: { color: "#10B981" },
          smooth: true,
        },
      ],
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
  }

  // Case 2: simple { labels, rates }
  if (!data.labels || !data.rates) {
    return <ChartSkeleton />;
  }

  const option = {
    title: { text: "Room Utilization", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: data.labels, axisLabel: { rotate: 45 } },
    yAxis: { type: "value", name: "Utilization (%)", min: 0, max: 100 },
    series: [
      {
        name: "Utilization",
        type: "bar",
        data: data.rates,
        itemStyle: { color: "#4F46E5" },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
