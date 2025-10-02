import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import DataAccess from "./pages/DataAccess";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
        <FilterProvider>
          <Router>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Layout Shell */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                {/* Nested Routes */}
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />

                {/* Admin-Only Routes */}
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin-panel"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/data-access"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <DataAccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
