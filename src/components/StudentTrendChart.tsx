// import React from 'react';
// import { Card } from './ui/Card';
// import { AttendanceRecord } from '../utils/types';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
// import { theme } from '../utils/theme';
// interface StudentTrendChartProps {
//   data: AttendanceRecord[];
// }
// export function StudentTrendChart({
//   data
// }: StudentTrendChartProps) {
//   // Map status to numeric value for trend line (Present=1, Absent=0)
//   // Or better: show cumulative attendance % over time
//   const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//   let presentCount = 0;
//   let totalCount = 0;
//   const trendData = sortedData.map(record => {
//     totalCount++;
//     if (record.Fajar_Namaz === 'Present') presentCount++;
//     return {
//       date: record.date,
//       status: record.Fajar_Namaz === 'Present' ? 1 : 0,
//       cumulativeRate: Math.round(presentCount / totalCount * 100),
//       statusLabel: record.Fajar_Namaz
//     };
//   });
//   return <Card title="Attendance Trend" className="mb-8">
//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="date" />
//             <YAxis domain={[0, 100]} unit="%" />
//             <Tooltip formatter={(value: any, name: string) => [name === 'cumulativeRate' ? `${value}%` : value, name === 'cumulativeRate' ? 'Attendance Rate' : name]} labelStyle={{
//             color: theme.colors.darkTeal
//           }} />
//             <ReferenceLine y={75} label="Target (75%)" stroke="red" strokeDasharray="3 3" />
//             <Line type="step" dataKey="cumulativeRate" stroke={theme.colors.cerulean} strokeWidth={3} dot={false} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>;
// }
import { Card } from "./ui/Card";
import { AttendanceRecord } from "../services/attendance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { theme } from "../utils/theme";

interface StudentTrendChartProps {
  data: AttendanceRecord[];
}

export function StudentTrendChart({ data }: StudentTrendChartProps) {
  // Sort by date field (string)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime()
  );

  let presentCount = 0;
  let totalCount = 0;

  const trendData = sortedData.map((record) => {
    totalCount++;
    if ((record.status || "").toLowerCase() === "present") presentCount++;
    return {
      date: record.date ? new Date(record.date).toLocaleDateString() : "Unknown",
      status: (record.status || "").toLowerCase() === "present" ? 1 : 0,
      cumulativeRate: Math.round((presentCount / totalCount) * 100),
      statusLabel: record.status ?? "—",
    };
  });

  return (
    <Card title="Attendance Trend" className="mb-8">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip
              formatter={(value: any, name: string) => [
                name === "cumulativeRate" ? `${value}%` : value,
                name === "cumulativeRate" ? "Attendance Rate" : name,
              ]}
              labelStyle={{ color: theme.colors.darkTeal }}
            />
            <ReferenceLine
              y={75}
              label="Target (75%)"
              stroke="red"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="cumulativeRate"
              stroke={theme.colors.cerulean}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
