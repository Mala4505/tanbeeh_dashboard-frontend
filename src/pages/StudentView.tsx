// import React from 'react';
// import { useAttendance } from '../hooks/useAttendance';
// import { FiltersPanel } from '../components/FiltersPanel';
// import { AttendanceTable } from '../components/AttendanceTable';
// import { Button } from '../components/ui/Button';
// import { Download } from 'lucide-react';
// export function AllStudentsPage() {
//   const {
//     data,
//     loading,
//     filters,
//     updateFilters
//   } = useAttendance();
//   const handleClearFilters = () => {
//     updateFilters({
//       date_from: undefined,
//       date_to: undefined,
//       room: '',
//       student: '',
//       status: ''
//     });
//   };
//   const handleExport = () => {
//     // Simple CSV export logic could go here
//     alert('Export functionality would generate a CSV here.');
//   };
//   return <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-darkTeal">All Students</h1>
//         <Button variant="outline" onClick={handleExport}>
//           <Download className="h-4 w-4 mr-2" />
//           Export CSV
//         </Button>
//       </div>

//       <FiltersPanel filters={filters} onUpdate={updateFilters} onClear={handleClearFilters} />

//       {loading ? <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean"></div>
//         </div> : <AttendanceTable data={data} />}
//     </div>;
// }


import { useAttendance } from "../hooks/useAttendance"; // ✅ aligned with new hook
import { FiltersPanel } from "../components/FiltersPanel";
import { AttendanceTable } from "../components/AttendanceTable";
import { Button } from "../components/ui/Button";
import { Download } from "lucide-react";
import { Spinner } from "../components/ui/Spinner"; // ✅ use our spinner component

export function AllStudentsPage() {
  const { data, loading, filters, updateFilters, refresh } = useAttendance();

  const handleClearFilters = () => {
    updateFilters({
      date_from: undefined,
      date_to: undefined,
      room: "",
      student: "",
      status: "",
    });
  };

  const handleExport = () => {
    // Simple CSV export logic could go here
    alert("Export functionality would generate a CSV here.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-darkTeal">All Students</h1>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <FiltersPanel
        filters={filters}
        onUpdate={updateFilters}
        onClear={handleClearFilters}
      />

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <AttendanceTable data={data} />
      )}

      {/* Refresh button if needed */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={refresh}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
