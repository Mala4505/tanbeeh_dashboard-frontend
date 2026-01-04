export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'faculty';
  tin_itis: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}
export interface AttendanceRecord {
  id?: string; // Assuming an ID might exist, though not specified in prompt, useful for keys
  Trno: string;
  BedName: string;
  RoomNo: string;
  Pantry: string;
  Location: string;
  Hizb: string;
  Darajah: string;
  Fajar_Namaz: 'Present' | 'Absent' | 'Late' | 'Excused';
  Fajar_Namaz_TP: string;
  Fajar_Namaz_Remarks: string;
  date: string; // Added for charting purposes
}
export interface AttendanceFilters {
  date_from?: string;
  date_to?: string;
  room?: string;
  student?: string;
  status?: string;
}
export interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  attendanceRate: number;
}