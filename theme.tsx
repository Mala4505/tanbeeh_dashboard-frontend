import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#1f2937',       // Tailwind primary (Slate-800)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb',       // Tailwind secondary (Gray-200)
      contrastText: '#1f2937',
    },
    error: {
      main: '#f63b58',       // Tailwind accent (Red tone)
    },
    warning: {
      main: '#facc15',       // Tailwind highlight (Yellow-400)
    },
    info: {
      main: '#3b82f6',       // Tailwind accent (Blue-500)
    },
    success: {
      main: '#10b981',       // Optional: Emerald-500
    },
    background: {
      default: '#f9fafb',    // Tailwind Gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#3b82f6',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem', color: '#1f2937' },
    h2: { fontWeight: 600, fontSize: '1.5rem', color: '#1f2937' },
    subtitle1: { color: '#3b82f6' },
    caption: { color: '#facc15' },
  },
});
