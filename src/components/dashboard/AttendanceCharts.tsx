import React from 'react';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { useFilter } from '../../context/FilterContext';
import { attendanceByRoom, attendanceByDay, attendanceByHizb } from '../../utils/mockData';

const AttendanceCharts = () => {
  const { dateFilter, roomFilter, hizbFilter } = useFilter();

  // You can later filter these datasets based on context filters
  const pieData = attendanceByHizb.map(item => ({
    id: item.hizb,
    value: item.present,
    label: item.hizb,
  }));

  const barData = {
    series: [
      {
        data: attendanceByRoom.map(item => item.present),
        label: 'Present',
        color: '#4caf50',
      },
      {
        data: attendanceByRoom.map(item => item.absent),
        label: 'Absent',
        color: '#f44336',
      },
    ],
    categories: attendanceByRoom.map(item => item.room),
  };

  const lineData = {
    series: [
      {
        data: attendanceByDay.map(item => item.present),
        label: 'Present',
        color: '#2196f3',
      },
      {
        data: attendanceByDay.map(item => item.absent),
        label: 'Absent',
        color: '#f44336',
      },
    ],
    categories: attendanceByDay.map(item => item.day),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Attendance by Hizb</h2>
        <PieChart
          series={[{
            data: pieData,
            innerRadius: 30,
            outerRadius: 80,
            paddingAngle: 2,
            cornerRadius: 4,
            startAngle: -90,
            endAngle: 270,
          }]}
          height={200}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Attendance by Room</h2>
        <BarChart
          xAxis={[{ data: barData.categories, scaleType: 'band' }]}
          series={barData.series}
          height={200}
          layout="vertical"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Weekly Attendance</h2>
        <LineChart
          xAxis={[{ data: lineData.categories, scaleType: 'point' }]}
          series={lineData.series}
          height={200}
        />
      </div>
    </div>
  );
};

export default AttendanceCharts;
