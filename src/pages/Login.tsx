// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ updated import
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import { Card } from "../components/ui/Card";

// export function LoginPage() {
//   const [tinItis, setTinItis] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth(); // ✅ simplified: context handles loading/error
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as any)?.from?.pathname || "/dashboard";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       await login(tinItis, password);
//       navigate(from, { replace: true });
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
//             <Input
//               label="TIN / ITIS ID"
//               type="text"
//               required
//               value={tinItis}
//               onChange={(e) => setTinItis(e.target.value)}
//               placeholder="Enter your ID"
//             />

//             <Input
//               label="Password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />

//             {error && (
//               <div className="rounded-md bg-red-50 p-4">
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
//               </div>
//             )}

//             <div>
//               <Button
//                 type="submit"
//                 className="w-full flex justify-center"
//                 isLoading={isLoading}
//               >
//                 Sign in
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginPage() {
  const [tinItis, setTinItis] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">T</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tanbeeh Dashboard
          </h1>
          <p className="text-muted-foreground">Sign in to manage student attendance</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TIN/ITIS Field */}
            <div>
              <label htmlFor="tinItis" className="block text-sm font-medium text-foreground mb-2">
                TIN / ITIS ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  id="tinItis"
                  type="text"
                  value={tinItis}
                  onChange={(e) => setTinItis(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-input text-foreground"
                  placeholder="Enter your ID"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-input text-foreground"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 Tanbeeh Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
