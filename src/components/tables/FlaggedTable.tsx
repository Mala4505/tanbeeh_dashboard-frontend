import { UserRole } from "../../lib/auth";
import { Check, X, MessageSquare, Trash2 } from "lucide-react";

interface Flag {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: "requested" | "approved" | "rejected";
}

interface TableFlagsProps {
  rows: Flag[];
  role: UserRole;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRemove?: (id: string) => void;
  onFeedback?: (id: string) => void;
}

export default function TableFlags({
  rows,
  role,
  onApprove,
  onReject,
  onRemove,
  onFeedback,
}: TableFlagsProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/20 text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No flagged students found
                </td>
              </tr>
            ) : (
              rows.map((flag) => (
                <tr
                  key={flag.id}
                  className="hover:bg-muted/10 transition-colors"
                  aria-label={`Flag for ${flag.studentName}`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {flag.studentName}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {flag.room}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {flag.reason}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {flag.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        flag.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : flag.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {flag.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {role === "prefect" && (
                        <button
                          onClick={() => onRemove?.(flag.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Remove Flag"
                          aria-label="Remove Flag"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      {role === "lajnat_member" && (
                        <button
                          onClick={() => onFeedback?.(flag.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Add Feedback"
                          aria-label="Add Feedback"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      )}

                      {role === "admin" && flag.status === "requested" && (
                        <>
                          <button
                            onClick={() => onApprove?.(flag.id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Approve"
                            aria-label="Approve Flag"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onReject?.(flag.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Reject"
                            aria-label="Reject Flag"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
