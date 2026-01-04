import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Users, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
export function Layout() {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [{
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  }, {
    name: 'All Students',
    href: '/all-students',
    icon: Users
  }];
  const isActive = (path: string) => location.pathname === path;
  return <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-darkTeal transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between h-16 px-4 bg-darkTeal border-b border-teal-800">
            <span className="text-xl font-bold text-white tracking-wider">
              ATTENDANCE
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-teal-200 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-4 py-6 border-b border-teal-800">
            <div className="flex items-center">
              <div className="bg-cerulean rounded-full p-2">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-teal-300 capitalize">
                  {user?.role || 'Guest'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map(item => {
            const active = isActive(item.href);
            return <Link key={item.name} to={item.href} className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${active ? 'bg-cerulean text-white' : 'text-teal-100 hover:bg-teal-800 hover:text-white'}
                  `} onClick={() => setIsMobileMenuOpen(false)}>
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-teal-300 group-hover:text-white'}`} />
                  {item.name}
                </Link>;
          })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-teal-800">
            <button onClick={logout} className="flex items-center w-full px-2 py-2 text-sm font-medium text-teal-100 rounded-md hover:bg-teal-800 hover:text-white transition-colors">
              <LogOut className="mr-3 h-5 w-5 text-teal-300" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-lg font-bold text-darkTeal">Attendance</span>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>;
}