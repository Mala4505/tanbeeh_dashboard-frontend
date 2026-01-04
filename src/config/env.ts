// config/env.ts

// Read API base URL from Vite environment
const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE ?? "";

// Warn in development if missing
if (!API_BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_API_BASE is not defined. API requests may fail. Set it in your .env file."
  );
}

export { API_BASE_URL };
