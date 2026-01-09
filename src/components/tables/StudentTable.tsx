import { useState } from "react";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

export interface Student {
  id: string;
  name: string | null;   // allow null
  room: string | null;
  status: "Present" | "Absent" | "Late";
  lastAttendance: string | null;
}

interface TableStudentsProps {
  rows: Student[];
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export default function TableStudents({
  rows,
  page = 1,
  pageSize = 10,
  total,
  onPageChange,
}: TableStudentsProps) {
  const [sortAsc, setSortAsc] = useState(true);

  // ✅ Safe sort: default to empty string
  const sortedRows = [...rows].sort((a, b) => {
    const idA = a.id ?? "";
    const idB = b.id ?? "";
    return sortAsc ? idA.localeCompare(idB) : idB.localeCompare(idA);
  });

  const totalPages = total ? Math.ceil(total / pageSize) : 1;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/20 text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="flex items-center gap-2 cursor-pointer hover:text-foreground"
                >
                  ID <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Attendance</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No students found
                </td>
              </tr>
            ) : (
              sortedRows.map((student) => {
                const initials = student.name
                  ? student.name.substring(0, 2).toUpperCase()
                  : "—";
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {student.id ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                          {initials}
                        </div>
                        <span className="font-medium text-foreground">
                          {student.name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {student.room ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : student.status === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {student.lastAttendance ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/20">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {sortedRows.length} results
          {total && ` of ${total}`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 border border-border rounded hover:bg-muted/20 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 border border-border rounded hover:bg-muted/20 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
