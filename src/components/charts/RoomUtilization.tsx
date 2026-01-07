import React from "react";
import ReactECharts from "echarts-for-react";
import SkeletonCard from "../SkeletonCard";

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
}

interface RoomUtilizationProps {
  data: RoomsData | RoomUtilizationItem[] | null;
}

export default function RoomUtilization({ data }: RoomUtilizationProps) {
  if (!data) {
    return <SkeletonCard height="400px" />;
  }

  // Case 1: extended array of objects
  if (Array.isArray(data)) {
    if (data.length === 0) return <SkeletonCard height="400px" />;

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
        data: data.map((d) => d.room),
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
          data: data.map((d) => d.capacity),
          itemStyle: { color: "#9CA3AF" },
        },
        {
          name: "Occupied",
          type: "bar",
          data: data.map((d) => d.occupied),
          itemStyle: { color: "#4F46E5" },
        },
        {
          name: "Utilization %",
          type: "line",
          yAxisIndex: 1,
          data: data.map((d) => d.utilization),
          itemStyle: { color: "#10B981" },
          smooth: true,
        },
      ],
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
  }

  // Case 2: simple { labels, rates }
  if (!data.labels || !data.rates) {
    return <SkeletonCard height="400px" />;
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
