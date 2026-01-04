// import { Card } from "./ui/Card";
// import { AttendanceRecord } from "../services/attendance";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { theme } from "../utils/theme";

// const PIE_COLORS: Record<string, string> = {
//   present: theme.colors.celadon,
//   absent: theme.colors.danger,
//   late: theme.colors.warning,
//   excused: theme.colors.mutedTeal,
// };

// interface AttendanceChartsProps {
//   data: { attendance: AttendanceRecord[] };
// }

// export function AttendanceCharts({ data }: AttendanceChartsProps) {
//   const records = Array.isArray(data?.attendance) ? data.attendance : [];

//   // Status counts (lowercase)
//   const statusCounts = records.reduce((acc, curr) => {
//     const s = (curr.status || "").toLowerCase();
//     acc[s] = (acc[s] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const pieData = Object.keys(statusCounts).map((key) => ({
//     name: key,
//     value: statusCounts[key],
//   }));

//   // Group by date (use provided date or fallback to "Unknown")
//   const dateMap = records.reduce((acc, curr) => {
//     const dateKey = curr.date ?? "Unknown";
//     const s = (curr.status || "").toLowerCase();

//     if (!acc[dateKey]) {
//       acc[dateKey] = { date: dateKey, present: 0, absent: 0, late: 0, excused: 0 };
//     }

//     // guard against unexpected status keys
//     if (["present", "absent", "late", "excused"].includes(s)) {
//       acc[dateKey][s] = (acc[dateKey][s] || 0) + 1;
//     } else {
//       // treat unknown as absent (or ignore) — here we ignore unknown statuses
//     }

//     return acc;
//   }, {} as Record<string, any>);

//   const barData = Object.values(dateMap).sort((a, b) => {
//     // try to sort by ISO date if possible, otherwise keep original order
//     const da = new Date(a.date);
//     const db = new Date(b.date);
//     if (!isNaN(da.getTime()) && !isNaN(db.getTime())) {
//       return da.getTime() - db.getTime();
//     }
//     return 0;
//   });

//   const lineData = barData.map((d) => {
//     const total = (d.present || 0) + (d.absent || 0) + (d.late || 0) + (d.excused || 0);
//     return { date: d.date, percentage: total > 0 ? Math.round(((d.present || 0) / total) * 100) : 0 };
//   });

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//       {/* Stacked Bar Chart */}
//       <Card title="Daily Attendance Overview">
//         <div className="h-80 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={barData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="present" stackId="a" fill={theme.colors.celadon} />
//               <Bar dataKey="absent" stackId="a" fill={theme.colors.danger} />
//               <Bar dataKey="late" stackId="a" fill={theme.colors.warning} />
//               <Bar dataKey="excused" stackId="a" fill={theme.colors.mutedTeal} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </Card>

//       {/* Pie Chart */}
//       <Card title="Overall Status Distribution">
//         <div className="h-80 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name] || theme.colors.cerulean} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </Card>

//       {/* Line Chart */}
//       <Card title="Attendance Trend (%)" className="lg:col-span-2">
//         <div className="h-80 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={lineData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="date" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="percentage"
//                 stroke={theme.colors.cerulean}
//                 strokeWidth={3}
//                 dot={{ r: 4, fill: theme.colors.darkTeal }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </Card>
//     </div>
//   );
// }


import { Card } from "./ui/Card";
import { AttendanceRecord } from "../services/attendance";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { theme } from "../utils/theme";

const PIE_COLORS: Record<string, string> = {
  present: theme.colors.celadon,
  absent: theme.colors.danger,
  late: theme.colors.warning,
  excused: theme.colors.mutedTeal,
};

interface AttendanceChartsProps {
  data: AttendanceRecord[];
}

export function AttendanceCharts({ data }: AttendanceChartsProps) {
  const records = Array.isArray(data) ? data : [];

  // Count statuses for pie chart
  const statusCounts = records.reduce((acc, curr) => {
    const s = (curr.status || "").toLowerCase();
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  // Group by date for bar chart
  const dateMap = records.reduce((acc, curr) => {
    const dateKey = curr.date ?? "Unknown";
    const s = (curr.status || "").toLowerCase();
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, present: 0, absent: 0, late: 0, excused: 0 };
    }
    if (["present", "absent", "late", "excused"].includes(s)) {
      acc[dateKey][s] = (acc[dateKey][s] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, any>);

  const barData = Object.values(dateMap);

  // Line chart: attendance rate trend
  const lineData = barData.map((d) => {
    const total = d.present + d.absent + d.late + d.excused;
    return { date: d.date, percentage: total > 0 ? Math.round((d.present / total) * 100) : 0 };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Stacked Bar Chart */}
      <Card title="Daily Attendance Overview">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" stackId="a" fill={theme.colors.celadon} />
              <Bar dataKey="absent" stackId="a" fill={theme.colors.danger} />
              <Bar dataKey="late" stackId="a" fill={theme.colors.warning} />
              <Bar dataKey="excused" stackId="a" fill={theme.colors.mutedTeal} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card title="Overall Status Distribution">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name] || theme.colors.cerulean} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Line Chart */}
      <Card title="Attendance Trend (%)" className="lg:col-span-2">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke={theme.colors.cerulean}
                strokeWidth={3}
                dot={{ r: 4, fill: theme.colors.darkTeal }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
