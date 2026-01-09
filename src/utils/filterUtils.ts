// import { DashboardFilters } from "../components/FiltersBar";

// export function applyFilters<T extends Record<string, any>>(items: T[] = [], filters: DashboardFilters): T[] {
//   return items.filter((item) => {
//     if (filters.room && item.room !== filters.room) return false;
//     if (filters.darajah && item.darajah !== filters.darajah) return false;
//     if (filters.hizb && item.hizb !== filters.hizb) return false;
//     if (filters.hizb_group && item.hizb_group !== filters.hizb_group) return false;
//     return true;
//   });
// }


// export function filterRooms(rooms: Record<string, any> = {}, filters: DashboardFilters) {
//   const filtered = Object.values(rooms).filter((r: any) => {
//     if (filters.room && r.room !== filters.room) return false;
//     if (filters.darajah && r.darajah !== filters.darajah) return false;
//     if (filters.hizb && r.hizb !== filters.hizb) return false;
//     if (filters.hizb_group && r.hizb_group !== filters.hizb_group) return false;
//     return true;
//   });

//   return {
//     labels: filtered.map((r: any) => r.name ?? r.room ?? ""),
//     rates: filtered.map((r: any) => r.rate ?? 0),
//     students: filtered.flatMap((r: any) => r.students ?? []),
//   };
// }


import { DashboardFilters } from "../components/FiltersBar";

// Types for chart‑friendly data
export interface RoomsData {
  labels: string[];
  rates: number[];
  students?: any[];
}

export interface DailyData {
  dates: string[];
  present: number[];
  absent: number[];
  late: number[];
  rate: number[];
  students?: any[];
}


// Defensive filter matcher
function matchesFilters(item: Record<string, any>, filters: DashboardFilters): boolean {
  // Date range checks
  if (filters.from) {
    const fromDate = new Date(filters.from);
    if (!isNaN(fromDate.getTime())) {
      const itemDate = new Date(item.date);
      if (itemDate < fromDate) return false;
    }
  }

  if (filters.to) {
    const toDate = new Date(filters.to);
    if (!isNaN(toDate.getTime())) {
      const itemDate = new Date(item.date);
      if (itemDate > toDate) return false;
    }
  }

  // Darajah filter
  if (filters.darajah && item.darajah !== filters.darajah) {
    return false;
  }

  // Hizb filter
  if (filters.hizb && item.hizb !== filters.hizb) {
    return false;
  }

  // Hizb group filter
  if (filters.hizb_group && item.hizb_group !== filters.hizb_group) {
    return false;
  }

  // Threshold filter (only apply if defined)
  if (filters.threshold !== undefined && item.rate !== undefined) {
    if (item.rate < filters.threshold) return false;
  }

  return true;
}

// Universal filter for arrays
export function applyFilters<T extends Record<string, any>>(items: T[] = [], filters: DashboardFilters): T[] {
  return items.filter((item: T) => matchesFilters(item, filters));
}


// Shared predicate for local filters
// function matchesFilters(item: Record<string, any>, filters: DashboardFilters): boolean {
//   if (filters.room && item.room !== filters.room) return false;
//   if (filters.darajah && item.darajah !== filters.darajah) return false;
//   if (filters.hizb && item.hizb !== filters.hizb) return false;
//   if (filters.hizb_group && item.hizb_group !== filters.hizb_group) return false;
//   return true;
// }

// // Universal filter for arrays
// export function applyFilters<T extends Record<string, any>>(items: T[] = [], filters: DashboardFilters): T[] {
//   return items.filter((item: T) => matchesFilters(item, filters));
// }

// Rooms → transform into chart‑friendly shape
export function filterRooms(rooms: Record<string, any> = {}, filters: DashboardFilters): RoomsData {
  const filtered = Object.values(rooms).filter((r: any) => matchesFilters(r, filters));

  return {
    labels: filtered.map((r: any) => r.name ?? r.room ?? ""),
    rates: filtered.map((r: any) => r.rate ?? 0),
    students: filtered.flatMap((r: any) => r.students ?? []),
  };
}

// Daily → preserve structure + apply date range
export function filterDaily(daily: DailyData = { dates: [], present: [], absent: [], late: [], rate: [], students: [] }, filters: DashboardFilters): DailyData {
  const { from, to } = filters;

  let dates: string[] = daily.dates ?? [];
  let present: number[] = daily.present ?? [];
  let absent: number[] = daily.absent ?? [];
  let late: number[] = daily.late ?? [];
  let rate: number[] = daily.rate ?? [];

  if (from || to) {
    // Normalize to local midnight boundaries
    const fromDate = from ? new Date(`${from}T00:00:00`) : null;
    const toDate = to ? new Date(`${to}T23:59:59`) : null;

    const indices: number[] = dates
      .map((d: string, idx: number): number | null => {
        const dateObj = new Date(d);
        if (fromDate && dateObj < fromDate) return null;
        if (toDate && dateObj > toDate) return null;
        return idx;
      })
      .filter((idx: number | null): idx is number => idx !== null);

    dates   = indices.map((i: number) => dates[i]);
    present = indices.map((i: number) => present[i]);
    absent  = indices.map((i: number) => absent[i]);
    late    = indices.map((i: number) => late[i]);
    rate    = indices.map((i: number) => rate[i]);
  }

  return {
    dates,
    present,
    absent,
    late,
    rate,
    students: applyFilters(daily.students ?? [], filters),
  };
}

// ✅ Compute summary for cards (Daily + Overall)
// export function computeSummary(
//   filteredStudents: Record<string, any>[],
//   filteredFlagged: Record<string, any>[],
//   filteredDaily: DailyData,
//   allDaily: DailyData, // pass unfiltered daily for overall stats
//   role: string
// ) {
//   const totalStudents = filteredStudents.length;

//   // Daily (filtered)
//   const dailyPresent = filteredDaily.present.reduce((a, b) => a + b, 0);
//   const dailyAbsent  = filteredDaily.absent.reduce((a, b) => a + b, 0);
//   const dailyDenom   = dailyPresent + dailyAbsent;

//   const presentRateDaily = dailyDenom ? (dailyPresent / dailyDenom) * 100 : 0;
//   const absentRateDaily  = dailyDenom ? (dailyAbsent / dailyDenom) * 100 : 0;

//   // Overall (all records)
//   const overallPresent = allDaily.present.reduce((a, b) => a + b, 0);
//   const overallAbsent  = allDaily.absent.reduce((a, b) => a + b, 0);
//   const overallDenom   = overallPresent + overallAbsent;

//   const presentRateOverall = overallDenom ? (overallPresent / overallDenom) * 100 : 0;
//   const absentRateOverall  = overallDenom ? (overallAbsent / overallDenom) * 100 : 0;

//   const flaggedCount = ["admin", "lajnat_member", "prefect"].includes(role)
//     ? filteredFlagged.length
//     : undefined;

//   return {
//     totalStudents,
//     presentRateDaily,
//     absentRateDaily,
//     presentRateOverall,
//     absentRateOverall,
//     flaggedCount,
//   };
// }

export function computeSummary(
  filteredStudents: Record<string, any>[],
  filteredFlagged: Record<string, any>[],
  filteredDaily: DailyData,
  allDaily: DailyData,
  role: string,
  apiSummary?: { totalStudents: number; flaggedCount?: number }
) {
  // Use backend-provided total if available
  const totalStudents =
    apiSummary?.totalStudents ?? filteredStudents.length;

  // Daily (filtered)
  const dailyPresent = filteredDaily.present.reduce((a, b) => a + b, 0);
  const dailyAbsent  = filteredDaily.absent.reduce((a, b) => a + b, 0);
  const dailyDenom   = dailyPresent + dailyAbsent;

  const presentRateDaily = dailyDenom ? (dailyPresent / dailyDenom) * 100 : 0;
  const absentRateDaily  = dailyDenom ? (dailyAbsent / dailyDenom) * 100 : 0;

  // Overall (all records)
  const overallPresent = allDaily.present.reduce((a, b) => a + b, 0);
  const overallAbsent  = allDaily.absent.reduce((a, b) => a + b, 0);
  const overallDenom   = overallPresent + overallAbsent;

  const presentRateOverall = overallDenom ? (overallPresent / overallDenom) * 100 : 0;
  const absentRateOverall  = overallDenom ? (overallAbsent / overallDenom) * 100 : 0;

  const flaggedCount = ["admin", "lajnat_member", "prefect"].includes(role)
    ? apiSummary?.flaggedCount ?? filteredFlagged.length
    : undefined;

  return {
    totalStudents,
    presentRateDaily,
    absentRateDaily,
    presentRateOverall,
    absentRateOverall,
    flaggedCount,
  };
}
