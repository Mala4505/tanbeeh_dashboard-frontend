import ReactECharts from "echarts-for-react";

export interface RoleComparisonItem {
  role: string;
  present: number;
  absent: number;
  late: number;
}

interface RoleComparisonProps {
  data: RoleComparisonItem[];
}

export default function RoleComparison({ data }: RoleComparisonProps) {
  const roles = data.map((d) => d.role);
  const present = data.map((d) => d.present);
  const absent = data.map((d) => d.absent);
  const late = data.map((d) => d.late);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "hsl(var(--card))",
      borderColor: "hsl(var(--border))",
      borderWidth: 1,
      textStyle: { color: "hsl(var(--foreground))" },
    },
    legend: {
      data: ["Present", "Absent", "Late"],
      top: 30,
      textStyle: { color: "hsl(var(--muted-foreground))" },
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: roles,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "hsl(var(--muted-foreground))" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "hsl(var(--muted-foreground))" },
      splitLine: { lineStyle: { color: "hsl(var(--border))" } },
    },
    series: [
      {
        name: "Present",
        type: "bar",
        data: present,
        itemStyle: { color: "#16a34a" }, // green
      },
      {
        name: "Absent",
        type: "bar",
        data: absent,
        itemStyle: { color: "#dc2626" }, // red
      },
      {
        name: "Late",
        type: "bar",
        data: late,
        itemStyle: { color: "#ea580c" }, // orange
      },
    ],
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-card-foreground">Role Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Attendance breakdown by role
          </p>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
}
