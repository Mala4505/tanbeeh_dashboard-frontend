import { Check, X, MessageSquare } from "lucide-react";

interface Approval {
  id: string;
  studentName: string;
  room: string;
  reason: string;
  date: string;
  status: "requested" | "approved" | "rejected";
}

interface ApprovalsTableProps {
  rows: Approval[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onFeedback?: (id: string) => void;
}

export default function ApprovalsTable({
  rows,
  onApprove,
  onReject,
  onFeedback,
}: ApprovalsTableProps) {
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
                  No approvals pending
                </td>
              </tr>
            ) : (
              rows.map((approval) => (
                <tr
                  key={approval.id}
                  className="hover:bg-muted/10 transition-colors"
                  aria-label={`Approval for ${approval.studentName}`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {approval.studentName}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {approval.room}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {approval.reason}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {approval.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        approval.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : approval.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {approval.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {approval.status === "requested" && (
                        <>
                          <button
                            onClick={() => onApprove?.(approval.id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Approve"
                            aria-label="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onReject?.(approval.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Reject"
                            aria-label="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onFeedback?.(approval.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Add Feedback"
                        aria-label="Add Feedback"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
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
