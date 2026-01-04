import React from 'react';
import { Card } from './ui/Card';
import { AttendanceRecord } from '../utils/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { theme } from '../utils/theme';
interface AttendanceChartsProps {
  data: AttendanceRecord[];
}
export function AttendanceCharts({
  data
}: AttendanceChartsProps) {
  // Process data for charts
  // 1. Status Distribution (Pie)
  const statusCounts = data.reduce((acc, curr) => {
    acc[curr.Fajar_Namaz] = (acc[curr.Fajar_Namaz] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));
  const PIE_COLORS = {
    Present: theme.colors.celadon,
    Absent: theme.colors.danger,
    Late: theme.colors.warning,
    Excused: theme.colors.mutedTeal
  };
  // 2. Attendance by Date (Stacked Bar)
  const dateMap = data.reduce((acc, curr) => {
    const date = curr.date || 'Unknown';
    if (!acc[date]) acc[date] = {
      date,
      Present: 0,
      Absent: 0,
      Late: 0,
      Excused: 0
    };
    acc[date][curr.Fajar_Namaz] = (acc[date][curr.Fajar_Namaz] || 0) + 1;
    return acc;
  }, {} as Record<string, any>);
  const barData = Object.values(dateMap).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // 3. Trend Line (Present % over time)
  const lineData = barData.map(d => {
    const total = d.Present + d.Absent + d.Late + d.Excused;
    return {
      date: d.date,
      percentage: total > 0 ? Math.round(d.Present / total * 100) : 0
    };
  });
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Stacked Bar Chart */}
      <Card title="Daily Attendance Overview">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{
              fontSize: 12
            }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" stackId="a" fill={theme.colors.celadon} />
              <Bar dataKey="Absent" stackId="a" fill={theme.colors.danger} />
              <Bar dataKey="Late" stackId="a" fill={theme.colors.warning} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card title="Overall Status Distribution">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS] || theme.colors.cerulean} />)}
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
              <Line type="monotone" dataKey="percentage" stroke={theme.colors.cerulean} strokeWidth={3} dot={{
              r: 4,
              fill: theme.colors.darkTeal
            }} activeDot={{
              r: 8
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>;
}