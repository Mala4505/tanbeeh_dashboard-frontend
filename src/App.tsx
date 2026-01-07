// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // ✅ use context, not hooks
// import { Layout } from "./components/Layout";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { LoginPage } from "./pages/Login";
// import { Dashboard } from "./pages/Dashboard";
// import { AllStudentsPage } from "./pages/StudentView";
// import { StudentDetailPage } from "./pages/StudentDetailPage";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />

//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Layout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="/dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="all-students" element={<AllStudentsPage />} />
//             <Route path="student/:id" element={<StudentDetailPage />} />
//           </Route>

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export { App };

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { LoginPage } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AllStudentsPage } from "./pages/StudentView";
import { StudentDetailPage } from "./pages/StudentDetailPage";

// Optional: if you want role-based restrictions
// import RoleGuard from "./components/RoleGuard";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Topbar />
          <main className="p-8 max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                {/* <RoleGuard allowedRoles={['masool','prefect','deputy_prefect','muaddib','lajnat','admin']}> */}
                  <Dashboard />
                {/* </RoleGuard> */}
              </ProtectedLayout>
            }
          />

          <Route
            path="/all-students"
            element={
              <ProtectedLayout>
                <AllStudentsPage />
              </ProtectedLayout>
            }
          />

          <Route
            path="/student/:id"
            element={
              <ProtectedLayout>
                <StudentDetailPage />
              </ProtectedLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export { App };
