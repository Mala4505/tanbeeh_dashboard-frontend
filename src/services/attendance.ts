import api from "./api";

export interface AttendanceRecord {
  id?: number;
  trno: string;
  student_name?: string | null;
  bed_name?: string | null;
  room?: string | null;
  pantry?: string | null;
  location?: string | null;
  darajah?: string | null;
  hizb?: string | null;
  status?: string | null; // 'present' | 'absent' | 'late' | 'excused'
  date?: string | null;
  remarks?: string | null;
  flagged?: boolean;
}

type AttendanceType = "fajr" | "maghrib-isha" | "dua";

/**
 * Fetch attendance data for a given type
 * Backend returns: { attendance: AttendanceRecord[] }
 */
export async function getAttendance(type: AttendanceType): Promise<AttendanceRecord[]> {
  const response = await api.get<{ attendance: AttendanceRecord[] }>(
    `/api/v1/attendance/${type}/`
  );
  return Array.isArray(response.data?.attendance) ? response.data.attendance : [];
}

/**
 * Flag an attendance record by internal record id
 */
export async function flagAttendance(attendanceId: number, reason?: string): Promise<void> {
  await api.post(`/api/v1/attendance/flag/`, {
    attendance_id: attendanceId,
    reason,
  });
}
