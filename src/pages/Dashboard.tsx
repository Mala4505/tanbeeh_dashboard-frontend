// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getDashboard } from "../api/client";
// import AdminLayout from "../components/layouts/AdminLayout";
// import PrefectLayout from "../components/layouts/PrefectLayout";
// import DeputyLayout from "../components/layouts/DeputyLayout";
// import MasoolLayout from "../components/layouts/MasoolLayout";
// import MuaddibLayout from "../components/layouts/MuaddibLayout";
// import LajnatLayout from "../components/layouts/LajnatLayout";
// import { Spinner } from "../components/ui/Spinner";
// import { Download } from "lucide-react";
// import { exportDashboardData } from "../lib/excel";
// import { DashboardFilters } from "../components/FiltersBar";

// import { applyFilters, filterRooms, computeSummary } from "../utils/filterUtils";

// export function Dashboard() {
//   const { user } = useAuth();
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [filters, setFilters] = useState<DashboardFilters>({
//     from: "",
//     to: "",
//     darajah: null,
//     hizb: null,
//     hizb_group: null,
//     threshold: 75,
//   });

//   const [stats, setStats] = useState<any>(null);
//   useEffect(() => {
//     if (!user?.role) return;
//     setLoading(true);
//     setError(null);

//     // ✅ only role scope from backend
//     getDashboard(user.role)
//       .then((res) => {
//         setData(res); // raw dataset
//         setStats(computeSummary(res, filters)); // initial local summary
//       })
//       .catch((err) => setError(err.message || "Failed to load dashboard"))
//       .finally(() => setLoading(false));
//   }, [user?.role]);

//   // ✅ recompute stats locally when filters change
//   useEffect(() => {
//     if (data) {
//       setStats(computeSummary(data, filters));
//     }
//   }, [filters, data]);



//   // getDashboard(user.role, {
//   //   from: filters.from,
//   //   to: filters.to,
//   //   darajah: null,
//   //   hizb: null,
//   //   hizb_group: null,
//   //   threshold: filters.threshold,
//   // })



//   const handleExport = () => {
//     if (!stats) return;
//     const studentsData = (data?.students || []).map((s: any) => ({
//       ID: s.id,
//       Name: s.name,
//       Room: s.room,
//       Status: s.status,
//       "Last Attendance": s.lastAttendance,
//     }));
//     const flagsData = (data?.flagged || []).map((f: any) => ({
//       Room: f.room,
//       Rate: f.rate,
//     }));
//     exportDashboardData(stats, data.daily, studentsData, flagsData);
//   };

//   // ✅ Initial spinner only while fetching role-scoped data
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-destructive/10 p-4 rounded-md text-destructive">
//         Error loading dashboard: {error}
//       </div>
//     );
//   }

//   if (!data) {
//     return <div className="text-destructive">No dashboard data available</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
//           <p className="text-muted-foreground">
//             Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
//           </p>
//         </div>
//         <button
//           onClick={handleExport}
//           className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
//         >
//           <Download className="h-4 w-4" />
//           Export to Excel
//         </button>
//       </div>

//       {/* ✅ Layouts handle skeletons internally */}
//       <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
//         {user?.role === "admin" && (
//           <AdminLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//         {user?.role === "prefect" && (
//           <PrefectLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//         {user?.role === "deputy" && (
//           <DeputyLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//         {user?.role === "masool" && (
//           <MasoolLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//         {user?.role === "muaddib" && (
//           <MuaddibLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//         {user?.role === "lajnat_member" && (
//           <LajnatLayout data={data} stats={stats} filters={filters} onFiltersChange={setFilters} />
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboard, DashboardResponse } from "../api/client";
import AdminLayout from "../components/layouts/AdminLayout";
import PrefectLayout from "../components/layouts/PrefectLayout";
import DeputyLayout from "../components/layouts/DeputyLayout";
import MasoolLayout from "../components/layouts/MasoolLayout";
import MuaddibLayout from "../components/layouts/MuaddibLayout";
import LajnatLayout from "../components/layouts/LajnatLayout";
import { Spinner } from "../components/ui/Spinner";
import { Download } from "lucide-react";
import { exportDashboardData } from "../lib/excel";
import { DashboardFilters } from "../components/FiltersBar";

import {
  applyFilters,
  filterRooms,
  filterDaily,
  computeSummary,
  RoomsData,
  DailyData,
} from "../utils/filterUtils";

export function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<DashboardFilters>({
    // from: "",
    // to: "",
    from: undefined,
    to: undefined,
    darajah: undefined,
    hizb: undefined,
    hizb_group: undefined,
    threshold: 75,
  });

  const [stats, setStats] = useState<ReturnType<typeof computeSummary> | null>(null);
  const [roomsData, setRoomsData] = useState<RoomsData | null>(null);
  const [dailyFiltered, setDailyFiltered] = useState<DailyData | null>(null);
  const [studentsFiltered, setStudentsFiltered] = useState<any[]>([]);
  const [flaggedFiltered, setFlaggedFiltered] = useState<any[]>([]);

  // ✅ Fetch raw dataset once per role
  useEffect(() => {
    if (!user?.role) return;
    setLoading(true);
    setError(null);

    getDashboard(user.role)
      .then((res) => {
        console.log("Dashboard API response:", JSON.stringify(res, null, 2));
        setData(res);

        // Initial compute
        const students = applyFilters(res.students ?? [], filters);
        const flagged = applyFilters(res.flagged ?? [], filters);
        const daily = filterDaily(res.daily ?? {}, filters);
        const allDaily = filterDaily(res.daily ?? {}, {} as DashboardFilters);
        const rooms = filterRooms(res.rooms ?? {}, filters);

        setStudentsFiltered(students);
        setFlaggedFiltered(flagged);
        setDailyFiltered(daily);
        setRoomsData(rooms);

        setStats(computeSummary(students, flagged, daily, allDaily, user.role ?? ""));

      })
      .catch((err) => setError(err.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [user?.role]);

  // ✅ recompute stats locally when filters change
  useEffect(() => {
    if (data) {
      const students = applyFilters(data.students ?? [], filters);
      const flagged = applyFilters(data.flagged ?? [], filters);

      const daily = filterDaily(data.daily ?? {}, filters);
      const allDaily = filterDaily(data.daily ?? {}, {} as DashboardFilters);
      const rooms = filterRooms(data.rooms ?? {}, filters);

      setStudentsFiltered(students);
      setFlaggedFiltered(flagged);
      setDailyFiltered(daily);
      setRoomsData(rooms);

      console.log("Raw students count:", data.students?.length);
      console.log("Filtered students count:", students.length);
      console.log("Filters applied:", filters);
      setStats(computeSummary(students, flagged, daily, allDaily, user?.role ?? "", data.summary));
    }
  }, [filters, data, user?.role]);

  const handleExport = () => {
    if (!stats || !data) return;
    const studentsData = (studentsFiltered || []).map((s: any) => ({
      ID: s.id,
      Name: s.name,
      Room: s.room,
      Status: s.status,
      "Last Attendance": s.lastAttendance,
    }));
    const flagsData = (flaggedFiltered || []).map((f: any) => ({
      Room: f.room,
      Rate: f.rate,
    }));
    exportDashboardData(stats, dailyFiltered ?? { dates: [], present: [], absent: [], late: [], rate: [] }, studentsData, flagsData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive">
        Error loading dashboard: {error}
      </div>
    );
  }

  if (!data) {
    return <div className="text-destructive">No dashboard data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </button>
      </div>

      {/* ✅ Layouts handle skeletons internally */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
        {user?.role === "admin" && (
          <AdminLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
            flagged={flaggedFiltered}
          />
        )}
        {user?.role === "prefect" && (
          <PrefectLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
            flagged={flaggedFiltered}
          />
        )}
        {user?.role === "deputy" && (
          <DeputyLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
          // flagged={flaggedFiltered}
          />
        )}
        {user?.role === "masool" && (
          <MasoolLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
          // flagged={flaggedFiltered}
          />
        )}
        {user?.role === "muaddib" && (
          <MuaddibLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
          // flagged={flaggedFiltered}
          />
        )}
        {user?.role === "lajnat_member" && (
          <LajnatLayout
            data={data}
            stats={stats}
            rooms={roomsData}
            filters={filters}
            onFiltersChange={setFilters}
            daily={dailyFiltered}
            students={studentsFiltered}
            flagged={flaggedFiltered}
          />
        )}
      </div>
    </div>
  );
}
