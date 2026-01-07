// src/types/dashboard.ts

// --- Summary stats ---
export interface SummaryStats {
  totalStudents: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  flaggedCount: number;
}

// --- Daily attendance trend ---
export interface DailyData {
  dates: string[];
  present: number[];
  absent: number[];
  late: number[];
  rate: number[];
}

// --- Weekly attendance trend ---
export interface WeeklyData {
  weeks: string[];
  present: number[];
  absent: number[];
  late: number[];
}

// --- Room utilization ---
export interface RoomsData {
  labels: string[];
  rates: number[];
}

// --- Flagged rooms ---
export interface FlaggedRoom {
  room: string;
  rate: number;
}

// --- Meta info ---
export interface DashboardMeta {
  role: string;
  range: { start: string; end: string };
  filters: { grade: string | null; room: string | null };
}

// --- Student rows ---
export type StudentStatus = "Present" | "Absent" | "Late";
export interface Student {
  id: string;
  name: string;
  room: string;
  status: StudentStatus;
  lastAttendance: string;
}

// --- Flag rows ---
export type FlagStatus = "requested" | "approved" | "rejected";
export interface Flag {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: FlagStatus;
}

// --- Unified dashboard response ---
export interface DashboardResponse {
  summary: SummaryStats;
  daily: DailyData;
  weekly: WeeklyData;
  rooms: RoomsData;
  flagged: FlaggedRoom[];
  meta: DashboardMeta;
  students?: Student[]; // optional, if backend adds students list
  flags?: Flag[];       // optional, if backend adds flags list
}
