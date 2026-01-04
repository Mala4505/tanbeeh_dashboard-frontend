import React from 'react';
import { Card } from './ui/Card';
import { AlertTriangle } from 'lucide-react';
import { AttendanceRecord } from '../utils/types';
interface FlagHighlightsProps {
  data: AttendanceRecord[];
}
export function FlagHighlights({
  data
}: FlagHighlightsProps) {
  // Identify students with high absences (> 3 in current dataset)
  const absenceCounts = data.reduce((acc, curr) => {
    if (curr.Fajar_Namaz === 'Absent') {
      if (!acc[curr.BedName]) acc[curr.BedName] = 0;
      acc[curr.BedName]++;
    }
    return acc;
  }, {} as Record<string, number>);
  const flaggedStudents = Object.entries(absenceCounts).filter(([_, count]) => count >= 3).sort((a, b) => b[1] - a[1]).slice(0, 5); // Top 5
  if (flaggedStudents.length === 0) return null;
  return <Card title="At-Risk Students (High Absences)" className="mb-8 border-l-4 border-l-red-500">
      <div className="space-y-4">
        {flaggedStudents.map(([name, count]) => <div key={name} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <span className="font-medium text-gray-900">{name}</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {count} Absences
            </span>
          </div>)}
      </div>
    </Card>;
}