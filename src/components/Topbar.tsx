// import React from 'react';
// import { Search, Bell, Mail } from 'lucide-react';
// import { getCurrentUser } from '../lib/auth';
// export default function Topbar() {
//   const user = getCurrentUser();
//   return <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
//       <div className="flex items-center flex-1 max-w-xl">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//           <input type="text" placeholder="Search task..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
//             <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded">
//               ⌘F
//             </kbd>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
//           <Mail className="h-5 w-5" />
//         </button>
//         <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
//           <Bell className="h-5 w-5" />
//           <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
//         </button>

//         <div className="h-8 w-px bg-gray-200 mx-2"></div>

//         <div className="flex items-center gap-3">
//           <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full object-cover border border-gray-200" />
//           <div className="hidden md:block text-sm">
//             <p className="font-medium text-gray-900">{user.name}</p>
//             <p className="text-gray-500 text-xs">{user.email}</p>
//           </div>
//         </div>
//       </div>
//     </header>;
// }


import { Search, Bell, Mail, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth(); // ✅ get user object from context

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Search bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search task..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded">
              ⌘F
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions + User info */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Mail className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        {/* ✅ Dynamic user info with Lucide icon */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
              <UserIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-medium text-gray-900">{user.name ?? "Anonymous"}</p>
              <p className="text-gray-500 text-xs">{user.role ?? ""}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Not signed in</div>
        )}
      </div>
    </header>
  );
}
