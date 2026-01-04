// import { Card } from "./ui/Card";
// import { AlertTriangle } from "lucide-react";
// import { AttendanceRecord } from "../services/attendance";

// interface FlagHighlightsProps {
//   data: { attendance: AttendanceRecord[] };
// }

// export function FlagHighlights({ data }: FlagHighlightsProps) {
//   const records = Array.isArray(data?.attendance) ? data.attendance : [];

//   // Count absences per student identifier (trno) with fallbacks
//   const absenceCounts = records.reduce((acc, curr) => {
//     const status = (curr.status || "").toLowerCase();
//     if (status === "absent") {
//       // Prefer trno (student id), then student_name, then bed_name, then id
//       const key =
//         curr.trno ??
//         curr.student_name ??
//         curr.bed_name ??
//         String(curr.id ?? "unknown");

//       acc[key] = (acc[key] || 0) + 1;
//     }
//     return acc;
//   }, {} as Record<string, number>);

//   const flaggedStudents = Object.entries(absenceCounts)
//     .filter(([_, count]) => count >= 3)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5);

//   if (flaggedStudents.length === 0) return null;

//   return (
//     <Card title="At-Risk Students (High Absences)" className="mb-8 border-l-4 border-l-red-500">
//       <div className="space-y-4">
//         {flaggedStudents.map(([identifier, count]) => (
//           <div key={identifier} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
//             <div className="flex items-center">
//               <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
//               <span className="font-medium text-gray-900">{identifier}</span>
//             </div>
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//               {count} Absences
//             </span>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }

import { Card } from "./ui/Card";
import { AlertTriangle } from "lucide-react";
import { AttendanceRecord } from "../services/attendance";

interface FlagHighlightsProps {
  data: AttendanceRecord[];
}

export function FlagHighlights({ data }: FlagHighlightsProps) {
  const records = Array.isArray(data) ? data : [];

  const absenceCounts = records.reduce((acc, curr) => {
    if ((curr.status || "").toLowerCase() === "absent") {
      const key = curr.trno ?? curr.student_name ?? curr.bed_name ?? String(curr.id ?? "unknown");
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const flaggedStudents = Object.entries(absenceCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (flaggedStudents.length === 0) return null;

  return (
    <Card title="At-Risk Students (High Absences)" className="mb-8 border-l-4 border-l-red-500">
      <div className="space-y-4">
        {flaggedStudents.map(([identifier, count]) => (
          <div key={identifier} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <span className="font-medium text-gray-900">{identifier}</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {count} Absences
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
