import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ updated import
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export function LoginPage() {
  const [tinItis, setTinItis] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // ✅ simplified: context handles loading/error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(tinItis, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-darkTeal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          University Attendance System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="TIN / ITIS ID"
              type="text"
              required
              value={tinItis}
              onChange={(e) => setTinItis(e.target.value)}
              placeholder="Enter your ID"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Login failed
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Card } from '../components/ui/Card';
// export function LoginPage() {
//   const [tinItis, setTinItis] = useState('');
//   const [password, setPassword] = useState('');
//   const {
//     login,
//     isLoading,
//     error
//   } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as any)?.from?.pathname || '/dashboard';
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(tinItis, password);
//       navigate(from, {
//         replace: true
//       });
//     } catch (err) {
//       // Error handled by hook/context
//     }
//   };
//   return <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="h-12 w-12 bg-darkTeal rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-xl">A</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           University Attendance System
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <Input label="TIN / ITIS ID" type="text" required value={tinItis} onChange={e => setTinItis(e.target.value)} placeholder="Enter your ID" />

//             <Input label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />

//             {error && <div className="rounded-md bg-red-50 p-4">
//                 <div className="flex">
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">
//                       Login failed
//                     </h3>
//                     <div className="mt-2 text-sm text-red-700">
//                       <p>{error}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>}

//             <div>
//               <Button type="submit" className="w-full flex justify-center" isLoading={isLoading}>
//                 Sign in
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>;
// }