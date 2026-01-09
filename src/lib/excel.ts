import * as XLSX from "xlsx";
import { DailyData } from "../utils/filterUtils";

export interface ExportData {
  sheetName: string;
  data: any[];
}

export function exportToExcel(
  datasets: ExportData[],
  filename: string = "dashboard-export.xlsx"
) {
  const workbook = XLSX.utils.book_new();

  datasets.forEach(({ sheetName, data }) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  XLSX.writeFile(workbook, filename);
}

export function exportDashboardData(
  stats: {
    totalStudents: number;
    presentRateDaily: number;
    absentRateDaily: number;
    presentRateOverall: number;
    absentRateOverall: number;
    flaggedCount?: number;
  },
  daily: DailyData,
  studentsData: any[],
  flagsData: any[]
) {
  // Transform DailyData into row objects for Excel
  const attendanceRows = daily.dates.map((date, i) => ({
    Date: date,
    Present: daily.present[i],
    Absent: daily.absent[i],
    Late: daily.late[i],
    Rate: daily.rate[i],
  }));

  const datasets: ExportData[] = [
    {
      sheetName: "Summary Statistics",
      data: [
        { Metric: "Total Students", Value: stats.totalStudents },
        { Metric: "Daily Present Rate", Value: `${stats.presentRateDaily.toFixed(1)}%` },
        { Metric: "Daily Absent Rate", Value: `${stats.absentRateDaily.toFixed(1)}%` },
        { Metric: "Overall Present Rate", Value: `${stats.presentRateOverall.toFixed(1)}%` },
        { Metric: "Overall Absent Rate", Value: `${stats.absentRateOverall.toFixed(1)}%` },
        { Metric: "Flagged Students", Value: stats.flaggedCount ?? 0 },
      ],
    },
    {
      sheetName: "Attendance Trends",
      data: attendanceRows,
    },
    {
      sheetName: "Students",
      data: studentsData,
    },
    {
      sheetName: "Flagged Students",
      data: flagsData,
    },
  ];

  exportToExcel(
    datasets,
    `tanbeeh-dashboard-${new Date().toISOString().split("T")[0]}.xlsx`
  );
}
