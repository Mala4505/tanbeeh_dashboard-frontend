import React from 'react';
import { UsersIcon, UserCheckIcon, UserXIcon, FlagIcon, HomeIcon, PercentIcon } from 'lucide-react';

interface SummaryCardsProps {
  stats: {
    totalStudents: number;
    presentToday: number;
    absentToday: number;
    flaggedStudents: number;
    roomsCovered: number;
    attendanceRate: number;
  };
}

const cardConfig = [
  { title: 'Total Students', key: 'totalStudents', icon: UsersIcon, color: 'bg-blue-600 text-blue-600' },
  { title: 'Present Today', key: 'presentToday', icon: UserCheckIcon, color: 'bg-green-600 text-green-600' },
  { title: 'Absent Today', key: 'absentToday', icon: UserXIcon, color: 'bg-red-600 text-red-600' },
  { title: 'Flagged Students', key: 'flaggedStudents', icon: FlagIcon, color: 'bg-yellow-500 text-yellow-500' },
  { title: 'Rooms Covered', key: 'roomsCovered', icon: HomeIcon, color: 'bg-purple-600 text-purple-600' },
  { title: 'Attendance Rate', key: 'attendanceRate', icon: PercentIcon, color: 'bg-cyan-600 text-cyan-600' },
];

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cardConfig.map(({ title, key, icon: Icon, color }, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} bg-opacity-20 mr-4`}>
            <Icon size={24} className={`${color.split(' ')[1]}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-semibold">
              {key === 'attendanceRate' ? `${stats[key]}%` : stats[key as keyof typeof stats]
}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
