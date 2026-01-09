import { DailyData, RoomsData } from "../utils/filterUtils";

export interface Student {
  id: string;
  name: string;
  room: string;
  status: string;
  lastAttendance?: string;
}

export interface Flagged {
  room: string;
  rate: number;
  reason?: string;
}

export interface Summary {
  totalStudents: number;
  presentRate: number;
  absentRate: number;
  lateRate?: number;
  flaggedCount?: number;
}

export interface WeeklyData {
  dates: string[];
  present: number[];
  absent: number[];
  late: number[];
  rate: number[];
}

export interface FlagsData {
  [key: string]: any; // adjust if you know exact shape
}

export interface MetaData {
  generatedAt: string;
  role: string;
  [key: string]: any; // extend with more metadata fields if needed
}

export interface DashboardResponse {
  students: Student[];
  flagged: Flagged[];
  rooms: Record<string, RoomsData>;
  daily: DailyData;
  summary: Summary;
  weekly: WeeklyData;
  flags: FlagsData;
  meta: MetaData;
}
