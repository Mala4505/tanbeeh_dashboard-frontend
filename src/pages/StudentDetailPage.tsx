// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../utils/api';
// import { AttendanceRecord } from '../utils/types';
// import { Card } from '../components/ui/Card';
// import { StudentTrendChart } from '../components/StudentTrendChart';
// import { AttendanceTable } from '../components/AttendanceTable';
// import { Button } from '../components/ui/Button';
// import { ArrowLeft, User } from 'lucide-react';
// export function StudentDetailPage() {
//   const {
//     id
//   } = useParams<{
//     id: string;
//   }>();
//   const navigate = useNavigate();
//   const [data, setData] = useState<AttendanceRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     async function fetchStudentData() {
//       if (!id) return;
//       try {
//         setLoading(true);
//         const records = await api.getStudentHistory(id);
//         setData(records);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStudentData();
//   }, [id]);
//   if (loading) return <div className="p-8 text-center">Loading student profile...</div>;
//   if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
//   if (!data.length) return <div className="p-8 text-center">No records found for this student.</div>;
//   const studentName = data[0]?.BedName || 'Unknown Student';
//   const roomNo = data[0]?.RoomNo || '-';
//   const totalPresent = data.filter(r => r.Fajar_Namaz === 'Present').length;
//   const attendanceRate = Math.round(totalPresent / data.length * 100);
//   return <div className="space-y-6">
//       <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent hover:text-cerulean">
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         Back to List
//       </Button>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Student Profile Card */}
//         <Card className="md:w-1/3 h-fit">
//           <div className="flex flex-col items-center text-center p-4">
//             <div className="h-24 w-24 bg-cerulean rounded-full flex items-center justify-center mb-4">
//               <User className="h-12 w-12 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-darkTeal">{studentName}</h2>
//             <p className="text-gray-500 mb-4">ID: {id}</p>

//             <div className="w-full grid grid-cols-2 gap-4 text-left mt-4 border-t pt-4">
//               <div>
//                 <p className="text-xs text-gray-500">Room No</p>
//                 <p className="font-medium">{roomNo}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Total Records</p>
//                 <p className="font-medium">{data.length}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Attendance Rate</p>
//                 <p className={`font-bold ${attendanceRate < 75 ? 'text-red-500' : 'text-green-600'}`}>
//                   {attendanceRate}%
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Charts & Data */}
//         <div className="md:w-2/3 space-y-6">
//           <StudentTrendChart data={data} />

//           <Card title="Attendance History">
//             <AttendanceTable data={data} />
//           </Card>
//         </div>
//       </div>
//     </div>;
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAttendance, AttendanceRecord } from "../services/attendance"; // ✅ updated import
import { Card } from "../components/ui/Card";
import { StudentTrendChart } from "../components/StudentTrendChart";
import { AttendanceTable } from "../components/AttendanceTable";
import { Button } from "../components/ui/Button";
import { ArrowLeft, User } from "lucide-react";

export function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudentData() {
      if (!id) return;
      try {
        setLoading(true);
        // For now, reuse getAttendance and filter by student id
        const allRecords = await getAttendance("fajr"); // or whichever dataset you want
        const studentRecords = allRecords.filter(
          (rec) => rec.id.toString() === id || rec.its_number === id
        );
        setData(studentRecords);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudentData();
  }, [id]);

  if (loading)
    return <div className="p-8 text-center">Loading student profile...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">Error: {error}</div>
    );
  if (!data.length)
    return (
      <div className="p-8 text-center">No records found for this student.</div>
    );

  const studentName = data[0]?.name || "Unknown Student";
  const itsNumber = data[0]?.its_number || "-";
  const role = data[0]?.role || "-";
  const totalPresent = data.filter((r) => r.status === "Present").length;
  const attendanceRate = Math.round((totalPresent / data.length) * 100);

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 pl-0 hover:bg-transparent hover:text-cerulean"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to List
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Student Profile Card */}
        <Card className="md:w-1/3 h-fit">
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-24 w-24 bg-cerulean rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-darkTeal">{studentName}</h2>
            <p className="text-gray-500 mb-4">ITS: {itsNumber}</p>

            <div className="w-full grid grid-cols-2 gap-4 text-left mt-4 border-t pt-4">
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="font-medium">{role}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Records</p>
                <p className="font-medium">{data.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Attendance Rate</p>
                <p
                  className={`font-bold ${
                    attendanceRate < 75 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {attendanceRate}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Charts & Data */}
        <div className="md:w-2/3 space-y-6">
          <StudentTrendChart data={data} />

          <Card title="Attendance History">
            <AttendanceTable data={data} />
          </Card>
        </div>
      </div>
    </div>
  );
}
