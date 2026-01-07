import * as XLSX from 'xlsx';

export interface ExportData {
  sheetName: string;
  data: any[];
}

export function exportToExcel(datasets: ExportData[], filename: string = 'dashboard-export.xlsx') {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Add each dataset as a separate sheet
  datasets.forEach(({ sheetName, data }) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Generate and download the file
  XLSX.writeFile(workbook, filename);
}

export function exportDashboardData(
  stats: any,
  attendanceData: any[],
  studentsData: any[],
  flagsData: any[]
) {
  const datasets: ExportData[] = [
    {
      sheetName: 'Summary Statistics',
      data: [
        { Metric: 'Total Students', Value: stats.totalStudents },
        { Metric: 'Present Rate', Value: `${stats.presentRate}%` },
        { Metric: 'Absent Rate', Value: `${stats.absentRate}%` },
        { Metric: 'Late Rate', Value: `${stats.lateRate}%` },
        { Metric: 'Flagged Students', Value: stats.flaggedCount },
      ],
    },
    {
      sheetName: 'Attendance Trends',
      data: attendanceData,
    },
    {
      sheetName: 'Students',
      data: studentsData,
    },
    {
      sheetName: 'Flagged Students',
      data: flagsData,
    },
  ];

  exportToExcel(datasets, `tanbeeh-dashboard-${new Date().toISOString().split('T')[0]}.xlsx`);
}
