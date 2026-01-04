// src/routes/RoleGuard.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  children: JSX.Element;
  allowedRoles: string[];
}

/**
 * Guard component that restricts access based on user role.
 * Redirects to /dashboard if role is not permitted.
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { role } = useAuth();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGuard;
