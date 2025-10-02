import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  CalendarCheckIcon,
  UsersIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ role, isOpen, collapsed, toggleCollapse, closeSidebar }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { to: "/attendance", label: "Attendance", icon: CalendarCheckIcon },
    { to: "/data-access", label: "Data Access", icon: LockIcon, adminOnly: true },
    { to: "/admin", label: "Admin Dashboard", icon: UsersIcon, adminOnly: true },
    { to: "/users", label: "Users", icon: UsersIcon, adminOnly: true },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-primary text-white pt-20 px-6 shadow-md z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon: Icon, adminOnly }) => {
            if (adminOnly && role !== "admin") return null;
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                  isActive
                    ? "bg-white text-primary"
                    : "text-secondary hover:text-highlight"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-6 text-xs text-white opacity-70">
          © 2025 Attendance System
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between h-full bg-primary text-white pt-20 px-4 shadow-md transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon: Icon, adminOnly }) => {
            if (adminOnly && role !== "admin") return null;
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                  isActive
                    ? "bg-white text-primary"
                    : "text-secondary hover:text-highlight"
                }`}
              >
                <Icon size={20} />
                <span
                  className={`transition-all duration-200 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col items-center mb-4">
          <button
            onClick={toggleCollapse}
            className="text-white opacity-70 hover:opacity-100 transition"
          >
            {collapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
          </button>
          {!collapsed && (
            <div className="text-xs text-white opacity-70 mt-2">
              © 2025 Attendance System
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
