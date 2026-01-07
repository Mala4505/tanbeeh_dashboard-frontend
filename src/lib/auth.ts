export type UserRole = 'masool' | 'prefect' | 'deputy' | 'muaddib' | 'lajnat' | 'admin' | 'lajnat_member';
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// Mock current user for demo purposes
// In a real app, this would come from a context or state management store
const MOCK_USER: User = {
  id: '1',
  name: 'Totok Michael',
  email: 'tmichael20@mail.com',
  role: 'admin',
  // Default role for demo, can be changed via localStorage
  avatarUrl: 'https://i.pravatar.cc/150?u=tmichael20'
};
export function isAuthenticated(): boolean {
  return localStorage.getItem('tanbeeh_authenticated') === 'true';
}
export function login(email: string, password: string, role: UserRole): boolean {
  // Mock login - in real app, this would call an API
  // For demo, accept any email/password
  localStorage.setItem('tanbeeh_authenticated', 'true');
  localStorage.setItem('tanbeeh_role', role);
  return true;
}
export function logout() {
  localStorage.removeItem('tanbeeh_authenticated');
  localStorage.removeItem('tanbeeh_role');
  window.location.href = '/login';
}
export function getCurrentUser(): User {
  const storedRole = localStorage.getItem('tanbeeh_role') as UserRole;
  return {
    ...MOCK_USER,
    role: storedRole || MOCK_USER.role
  };
}
export function getCurrentUserRole(): UserRole {
  return getCurrentUser().role;
}
export function setUserRole(role: UserRole) {
  localStorage.setItem('tanbeeh_role', role);
  window.location.reload(); // Simple reload to apply role change
}
export function checkPermission(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}