import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUserRole, UserRole, logout } from '../lib/auth';
import { LayoutDashboard, Users, Flag, Bell, Settings, LogOut } from 'lucide-react';
export default function Sidebar() {
  const role = getCurrentUserRole();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const getLinks = (role: UserRole) => {
    const links = [{
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    }, {
      href: '/students',
      label: 'Students',
      icon: Users
    }];
    if (['prefect', 'lajnat', 'admin'].includes(role)) {
      links.push({
        href: '/flags',
        label: 'Flags',
        icon: Flag
      });
    }
    if (role === 'lajnat') {
      links.push({
        href: '/notifications',
        label: 'Notifications',
        icon: Bell
      });
    }
    if (role === 'admin') {
      links.push({
        href: '/management',
        label: 'Management',
        icon: Settings
      });
    }
    return links;
  };
  const links = getLinks(role);
  return <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">J</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Insights</h1>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Menu
          </p>
          {links.map(link => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return <Link key={link.href} to={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>;
        })}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            General
          </p>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>;
}