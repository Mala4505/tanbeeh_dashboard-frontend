import { useEffect } from "react";
import { Card } from "./ui/Card";
import { Users, UserCheck, UserX, Percent } from "lucide-react";
import { AttendanceRecord } from "../services/attendance";

interface DashboardOverviewProps {
  data: AttendanceRecord[];
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const records = Array.isArray(data) ? data : [];

  useEffect(() => {
    console.log("API data (attendance):", records);
  }, [records]);

  const uniqueStudents = new Set(records.map((r) => r.trno ?? "")).size;
  const presentCount = records.filter((r) => (r.status || "").toLowerCase() === "present").length;
  const absentCount = records.filter((r) => (r.status || "").toLowerCase() === "absent").length;
  const totalRecords = records.length;
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  const stats = [
    { label: "Unique Students", value: uniqueStudents, icon: Users, color: "text-cerulean", bg: "bg-cyan-50" },
    { label: "Present Records", value: presentCount, icon: UserCheck, color: "text-celadon", bg: "bg-green-50" },
    { label: "Absent Records", value: absentCount, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
    { label: "Attendance Rate", value: `${attendanceRate}%`, icon: Percent, color: "text-mutedTeal", bg: "bg-teal-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-l-4 border-l-cerulean">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-darkTeal">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
