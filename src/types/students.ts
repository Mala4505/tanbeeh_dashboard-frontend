export type UserRole = "admin" | "prefect" | "lajnat_member";
export type StudentStatus = "Present" | "Absent" | "Late";

export interface Student {
  id: string;
  name: string;
  room: string;
  status: StudentStatus;
  lastAttendance: string;
}

// types/flags.ts
export type FlagStatus = "requested" | "approved" | "rejected";

export interface Flag {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: FlagStatus;
}
