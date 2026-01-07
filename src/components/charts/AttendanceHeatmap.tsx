import ReactECharts from "echarts-for-react";

export interface HeatmapItem {
  room: string;
  days: Record<string, number>; // e.g. { Mon: 85, Tue: 90, ... }
}

interface AttendanceHeatmapProps {
  data: HeatmapItem[];
}

export default function AttendanceHeatmap({ data }: AttendanceHeatmapProps) {
  // Extract unique rooms and days
  const rooms = data.map((d) => d.room);
  const days = Object.keys(data[0]?.days || {});

  // Flatten into [day, room, value] tuples
  const values: [number, number, number][] = [];
  data.forEach((roomItem, roomIndex) => {
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
    xAxis: {
      type: "category",
      data: days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "hsl(var(--muted-foreground))" },
    },
    yAxis: {
      type: "category",
      data: rooms,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "hsl(var(--muted-foreground))" },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0",
      inRange: {
        color: ["#dc2626", "#facc15", "#16a34a"], // red → yellow → green
      },
      textStyle: { color: "hsl(var(--muted-foreground))" },
    },
    series: [
      {
        name: "Attendance %",
        type: "heatmap",
        data: values,
        label: { show: true, color: "hsl(var(--foreground))" },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" },
        },
      },
    ],
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-card-foreground">Attendance Heatmap</h3>
          <p className="text-sm text-muted-foreground">
            Attendance distribution across rooms and days
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
}
