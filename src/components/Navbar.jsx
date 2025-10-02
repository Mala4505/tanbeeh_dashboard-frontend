import React from "react";
import { IconButton, Avatar, Typography } from "@mui/material";
import { MenuIcon, BellIcon, ChevronDownIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-primary text-white shadow-md h-16 px-6 flex items-center justify-between z-50">
      {/* Left: Sidebar toggle + title */}
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleSidebar} className="text-white">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="font-bold text-white">
          Tanbeeh Management
        </Typography>
      </div>

      {/* Right: Notifications + User Info + Logout */}
      <div className="flex items-center gap-4">
        <IconButton className="text-white">
          <BellIcon size={20} />
        </IconButton>

        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{ width: 32, height: 32 }}
          />
          <div className="hidden sm:block text-right">
            <Typography variant="subtitle2" className="text-white">
              {user?.name}
            </Typography>
            <Typography variant="caption" className="text-white text-opacity-80">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </Typography>
          </div>
          <IconButton size="small" className="text-white">
            <ChevronDownIcon size={16} />
          </IconButton>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
