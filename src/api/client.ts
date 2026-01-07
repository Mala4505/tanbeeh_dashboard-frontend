import api from "../services/api";
import { DashboardFilters } from "../components/FiltersBar";

// --- Types ---
export interface SummaryStats {
  totalStudents: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  flaggedCount?: number;
}

export interface TrendItem {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface RoleComparisonItem {
  role: string;
  present: number;
  absent: number;
  late: number;
}

export interface HeatmapItem {
  room: string;
  days: Record<string, number>;
}

export interface FlaggedTrendItem {
  date: string;
  flagged: number;
  resolved: number;
}

export interface DistributionItem {
  name: string;
  value: number;
}

export interface RoomUtilizationItem {
  room: string;
  capacity: number;
  occupied: number;
  utilization: number;
}

// Raw API rows
export interface StudentRow {
  id: string;
  name: string;
  room: string;
  status: string;
  lastAttendance: string;
}

export interface FlagRow {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: string;
}

// Strict UI types
export type StudentStatus = "Present" | "Absent" | "Late";
export interface Student {
  id: string;
  name: string;
  room: string;
  status: StudentStatus;
  lastAttendance: string;
}

export type FlagStatus = "requested" | "approved" | "rejected";
export interface Flag {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: FlagStatus;
}

// Unified dashboard response
export interface DailyData {
  dates: string[];
  present: number[];
  absent: number[];
  late: number[];
  rate: number[];
}

export interface WeeklyData {
  weeks: string[];
  present: number[];
  absent: number[];
  late: number[];
}

export interface RoomsData {
  labels: string[];
  rates: number[];
}

export interface FlaggedRoom {
  room: string;
  rate: number;
}

export interface DashboardResponse {
  summary: SummaryStats;
  daily: DailyData;
  weekly: WeeklyData;
  rooms: RoomsData;
  flagged: FlaggedRoom[];
  students: Student[];
  flags: Flag[];
  meta: {
    role: string;
    range: { start: string; end: string };
    filters: {
      darajah: string | null;
      hizb: string | null;
      hizb_group: string | null;
    };
    options?: {
      darajah: string[];
      hizb: string[];
      hizb_group: string[];
    };
  };
}

// --- Normalizers ---
function normalizeStudentStatus(status: string): StudentStatus {
  switch (status.toLowerCase()) {
    case "present": return "Present";
    case "absent": return "Absent";
    case "late": return "Late";
    default: return "Present";
  }
}

function normalizeFlagStatus(status: string): FlagStatus {
  switch (status.toLowerCase()) {
    case "requested": return "requested";
    case "approved": return "approved";
    case "rejected": return "rejected";
    default: return "requested";
  }
}

// --- Query builder ---
function buildQuery(role: string, filters: DashboardFilters): string {
  return new URLSearchParams({
    role,
    from: filters.from ?? "",
    to: filters.to ?? "",
    darajah: filters.darajah ?? "",
    hizb: filters.hizb ?? "",
    hizb_group: filters.hizb_group ?? "",
    threshold: filters.threshold ? String(filters.threshold) : "",
  }).toString();
}


// --- API calls ---
export async function getDashboard(
  role: string,
  filters: DashboardFilters = { from: "", to: "", darajah: null, hizb: null, hizb_group: null }
): Promise<DashboardResponse> {
  try {
    const query = buildQuery(role, filters);
    const res = await api.get(`/api/v1/dashboard/bootstrap/?${query}`);
    const json = res.data;

    const students: Student[] = (json.students || []).map((row: StudentRow) => ({
      ...row,
      status: normalizeStudentStatus(row.status),
    }));

    const flags: Flag[] = (json.flags || []).map((row: FlagRow) => ({
      ...row,
      status: normalizeFlagStatus(row.status),
    }));

    return { ...json, students, flags };
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || `Dashboard fetch failed: ${err.message}`);
  }
}


// --- Flag mutations ---
export async function approveFlag(flagId: string) {
  const res = await api.post(`/api/v1/dashboard/flags/${flagId}/approve/`);
  return res.data;
}

export async function rejectFlag(flagId: string) {
  const res = await api.post(`/api/v1/dashboard/flags/${flagId}/reject/`);
  return res.data;
}

export async function removeFlag(flagId: string) {
  const res = await api.delete(`/api/v1/dashboard/flags/${flagId}/`);
  return res.data;
}

export async function addFlagFeedback(flagId: string, feedback: string) {
  const res = await api.post(`/api/v1/dashboard/flags/${flagId}/feedback/`, { feedback });
  return res.data;
}
