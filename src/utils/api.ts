import { AttendanceFilters, AuthResponse, AttendanceRecord } from './types';
const API_BASE_URL = '/api';
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || 'An error occurred');
  }
  return response.json();
}
function getHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? {
      Authorization: `Bearer ${token}`
    } : {})
  };
}
export const api = {
  login: async (tin_itis: string, password: string): Promise<AuthResponse> => {
    // In a real app, this fetches from the backend
    // For demo purposes, if the backend isn't running, we might want to mock this
    // But following instructions to implement direct API integration:
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tin_itis,
        password
      })
    });
    return handleResponse<AuthResponse>(response);
  },
  getAttendance: async (filters: AttendanceFilters): Promise<AttendanceRecord[]> => {
    const params = new URLSearchParams();
    if (filters.date_from) params.append('date_from', filters.date_from);
    if (filters.date_to) params.append('date_to', filters.date_to);
    if (filters.room) params.append('room', filters.room);
    if (filters.student) params.append('student', filters.student);
    if (filters.status) params.append('status', filters.status);
    const response = await fetch(`${API_BASE_URL}/attendance/?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse<AttendanceRecord[]>(response);
  },
  // Helper to get a single student's history (reusing the main endpoint with filters)
  getStudentHistory: async (studentId: string): Promise<AttendanceRecord[]> => {
    // Assuming 'student' filter accepts ID or Name. Using ID here.
    const response = await fetch(`${API_BASE_URL}/attendance/?student=${studentId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse<AttendanceRecord[]>(response);
  }
};