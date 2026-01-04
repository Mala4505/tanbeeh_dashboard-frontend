// import { useMemo, useState } from "react";
// import { Card } from "./ui/Card";
// import { AttendanceRecord, flagAttendance } from "../services/attendance";
// import { ChevronLeft, ChevronRight, ArrowUpDown, Flag } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface AttendanceTableProps {
//   // backend returns { attendance: AttendanceRecord[] } — consume the attendance array
//   data: { attendance?: AttendanceRecord[] };
// }

// export function AttendanceTable({ data }: AttendanceTableProps) {
//   const records = Array.isArray(data?.attendance) ? data.attendance : [];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof AttendanceRecord;
//     direction: "asc" | "desc";
//   } | null>(null);

//   const { role } = useAuth();

//   // Sorting (robust to missing keys and mixed types)
//   const sortedData = useMemo(() => {
//     const sortableItems = [...records];
//     if (sortConfig !== null) {
//       const { key, direction } = sortConfig;
//       sortableItems.sort((a, b) => {
//         const va = (a as any)[key] ?? "";
//         const vb = (b as any)[key] ?? "";

//         // numeric compare if both are numbers
//         if (typeof va === "number" && typeof vb === "number") {
//           return direction === "asc" ? va - vb : vb - va;
//         }

//         // try Date compare if both look like valid dates
//         const da = new Date(String(va));
//         const db = new Date(String(vb));
//         if (!isNaN(da.getTime()) && !isNaN(db.getTime())) {
//           return direction === "asc" ? da.getTime() - db.getTime() : db.getTime() - da.getTime();
//         }

//         // fallback to string localeCompare
//         return direction === "asc"
//           ? String(va).localeCompare(String(vb))
//           : String(vb).localeCompare(String(va));
//       });
//     }
//     return sortableItems;
//   }, [records, sortConfig]);

//   // Pagination
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.max(1, Math.ceil(records.length / rowsPerPage));

//   const requestSort = (key: keyof AttendanceRecord) => {
//     let direction: "asc" | "desc" = "asc";
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getStatusColor = (status?: string) => {
//     const s = (status || "").toLowerCase();
//     switch (s) {
//       case "present":
//         return "bg-green-100 text-green-800";
//       case "absent":
//         return "bg-red-100 text-red-800";
//       case "late":
//         return "bg-yellow-100 text-yellow-800";
//       case "excused":
//         return "bg-teal-100 text-teal-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleFlag = async (id: number | undefined) => {
//     if (id === undefined || id === null) return;
//     try {
//       await flagAttendance(Number(id));
//       console.log("Record flagged successfully");
//     } catch {
//       console.error("Failed to flag record");
//     }
//   };

//   // Use fields that actually exist on AttendanceRecord
//   const headers: (keyof AttendanceRecord)[] = [
//     "id",
//     "trno",
//     "student_name",
//     "bed_name",
//     "status",
//     "date",
//   ];

//   const formatDateDisplay = (raw?: string | null) => {
//     if (!raw) return "—";
//     const d = new Date(String(raw));
//     if (!isNaN(d.getTime())) return d.toLocaleString();
//     return String(raw); // fallback to raw string (e.g., "05:52:26")
//   };

//   return (
//     <Card className="overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {headers.map((header) => (
//                 <th
//                   key={String(header)}
//                   scope="col"
//                   aria-sort={
//                     sortConfig?.key === header
//                       ? sortConfig.direction === "asc"
//                         ? "ascending"
//                         : "descending"
//                       : "none"
//                   }
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   onClick={() => requestSort(header)}
//                 >
//                   <div className="flex items-center space-x-1">
//                     <span>{String(header).replace("_", " ")}</span>
//                     <ArrowUpDown className="h-3 w-3" />
//                   </div>
//                 </th>
//               ))}
//               <th scope="col" className="relative px-6 py-3">
//                 <span className="sr-only">Actions</span>
//               </th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentRows.length > 0 ? (
//               currentRows.map((record) => {
//                 const recordId = record.id;
//                 const trno = record.trno ?? "—";
//                 const studentName = record.student_name ?? record.bed_name ?? "—";
//                 const statusDisplay = record.status ?? "—";
//                 const dateDisplay = formatDateDisplay(record.date);

//                 return (
//                   <tr key={recordId ?? record.trno} className="hover:bg-gray-50 transition-colors">
//                     {/* Internal record serial */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recordId ?? "—"}</td>

//                     {/* Student identifier (trno) */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkTeal">
//                       {trno}
//                     </td>

//                     {/* Student name or bed name fallback */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentName}</td>

//                     {/* Bed name column (if you want to keep both, otherwise remove) */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.bed_name ?? "—"}</td>

//                     {/* Status */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                           statusDisplay
//                         )}`}
//                       >
//                         {statusDisplay}
//                       </span>
//                     </td>

//                     {/* Date / TP */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateDisplay}</td>

//                     {/* Actions */}
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-3">
//                       {/* Link to student profile by trno (use its_number or student_id when available) */}
//                       <Link to={`/student/${record.trno}`} className="text-cerulean hover:text-darkTeal">
//                         View
//                       </Link>

//                       {role &&
//                         [
//                           "admin",
//                           "prefect",
//                           "deputy prefect",
//                           "muaddib",
//                           "masool",
//                           "lajnat",
//                         ].includes(role.toLowerCase()) && (
//                           <button
//                             onClick={() => handleFlag(recordId)}
//                             className="text-red-600 hover:text-red-800 flex items-center space-x-1"
//                             aria-label={`Flag record ${recordId ?? record.trno}`}
//                           >
//                             <Flag className="h-4 w-4" />
//                             <span>Flag</span>
//                           </button>
//                         )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={headers.length + 1} className="px-6 py-10 text-center text-gray-500">
//                   No records found matching your filters.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">{indexOfFirstRow + 1}</span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {Math.min(indexOfLastRow, records.length)}
//               </span>{" "}
//               of <span className="font-medium">{records.length}</span> results
//             </p>
//           </div>

//           <div>
//             <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeft className="h-4 w-4" />
//               </button>

//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 const pageNum = i + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
//                       ? "z-10 bg-cerulean border-cerulean text-white"
//                       : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages}
//                 className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">{indexOfFirstRow + 1}</span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {Math.min(indexOfLastRow, records.length)}
//               </span>{" "}
//               of <span className="font-medium">{records.length}</span> results
//             </p>
//           </div>

//           <div>
//             <nav
//               className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//               aria-label="Pagination"
//             >
//               {/* Previous button */}
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//               </button>

//               {/* Page numbers (first up to 5 pages) */}
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 const pageNum = i + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
//                       ? "z-10 bg-cerulean border-cerulean text-white"
//                       : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               {/* Next button */}
//               <button
//                 onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages}
//                 className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRight className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// } 

import { useMemo, useState } from "react";
import { Card } from "./ui/Card";
import { AttendanceRecord, flagAttendance } from "../services/attendance";
import { ChevronLeft, ChevronRight, ArrowUpDown, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

export function AttendanceTable({ data }: AttendanceTableProps) {
  const records = Array.isArray(data) ? data : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AttendanceRecord;
    direction: "asc" | "desc";
  } | null>(null);

  const { role } = useAuth();

  const sortedData = useMemo(() => {
    const sortableItems = [...records];
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      sortableItems.sort((a, b) => {
        const va = a[key] ?? "";
        const vb = b[key] ?? "";
        if (typeof va === "number" && typeof vb === "number") {
          return direction === "asc" ? va - vb : vb - va;
        }
        const da = new Date(String(va));
        const db = new Date(String(vb));
        if (!isNaN(da.getTime()) && !isNaN(db.getTime())) {
          return direction === "asc" ? da.getTime() - db.getTime() : db.getTime() - da.getTime();
        }
        return direction === "asc"
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
    }
    return sortableItems;
  }, [records, sortConfig]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.max(1, Math.ceil(records.length / rowsPerPage));

  const requestSort = (key: keyof AttendanceRecord) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status?: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      case "excused": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleFlag = async (id: number | undefined) => {
    if (id === undefined) return;
    try {
      await flagAttendance(id);
      console.log("Record flagged successfully");
    } catch {
      console.error("Failed to flag record");
    }
  };

  const headers: (keyof AttendanceRecord)[] = ["id", "trno", "student_name", "bed_name", "status", "date"];

  const formatDateDisplay = (raw?: string | null) => {
    if (!raw) return "—";
    const d = new Date(String(raw));
    if (!isNaN(d.getTime())) return d.toLocaleString();
    return String(raw);
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={String(header)}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(header)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{String(header).replace("_", " ")}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.length > 0 ? (
              currentRows.map((record) => (
                <tr key={record.id ?? record.trno} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id ?? "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkTeal">{record.trno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.student_name ?? "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.bed_name ?? "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status ?? undefined)}`}>
                      {record.status ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateDisplay(record.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-3">
                    <Link to={`/student/${record.trno}`} className="text-cerulean hover:text-darkTeal">
                      View
                    </Link>
                    {role &&
                      ["admin", "prefect", "deputy prefect", "muaddib", "masool", "lajnat"].includes(role.toLowerCase()) && (
                        <button
                          onClick={() => handleFlag(record.id)}
                          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                          aria-label={`Flag record ${record.id ?? record.trno}`}
                        >
                          <Flag className="h-4 w-4" />
                          <span>Flag</span>
                        </button>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="px-6 py-10 text-center text-gray-500">
                  No records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 text-sm rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 px-4 py-2 border border-gray-300 text-sm rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstRow + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastRow, records.length)}</span> of{" "}
            <span className="font-medium">{records.length}</span> results
          </p>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 border text-sm font-medium ${
                    currentPage === pageNum
                      ? "z-10 bg-cerulean border-cerulean text-white"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </Card>
  );
}
