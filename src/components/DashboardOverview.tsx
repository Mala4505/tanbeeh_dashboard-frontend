import React from 'react';
import { Card } from './ui/Card';
import { Users, UserCheck, UserX, Percent } from 'lucide-react';
import { AttendanceRecord } from '../utils/types';
interface DashboardOverviewProps {
  data: AttendanceRecord[];
}
export function DashboardOverview({
  data
}: DashboardOverviewProps) {
  // Calculate stats
  const totalStudents = new Set(data.map(r => r.BedName)).size;
  const presentToday = data.filter(r => r.Fajar_Namaz === 'Present').length;
  const absentToday = data.filter(r => r.Fajar_Namaz === 'Absent').length;
  const totalRecords = data.length;
  const attendanceRate = totalRecords > 0 ? Math.round(data.filter(r => r.Fajar_Namaz === 'Present').length / totalRecords * 100) : 0;
  const stats = [{
    label: 'Total Students',
    value: totalStudents,
    icon: Users,
    color: 'text-cerulean',
    bg: 'bg-cyan-50'
  }, {
    label: 'Present Today',
    value: presentToday,
    icon: UserCheck,
    color: 'text-celadon',
    bg: 'bg-green-50'
  }, {
    label: 'Absent Today',
    value: absentToday,
    icon: UserX,
    color: 'text-red-500',
    bg: 'bg-red-50'
  }, {
    label: 'Attendance Rate',
    value: `${attendanceRate}%`,
    icon: Percent,
    color: 'text-mutedTeal',
    bg: 'bg-teal-50'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(stat => <Card key={stat.label} className="border-l-4 border-l-cerulean">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-darkTeal">{stat.value}</p>
            </div>
          </div>
        </Card>)}
    </div>;
}