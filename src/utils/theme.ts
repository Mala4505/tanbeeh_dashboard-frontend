export const theme = {
  colors: {
    darkTeal: "#074f57",
    cerulean: "#077187",
    mutedTeal: "#74a57f",
    celadon: "#9ece9a",
    desertSand: "#e4c5af",
    white: "#ffffff",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    danger: "#ef4444", // Absent
    warning: "#f59e0b", // Late
    success: "#10b981", // Present
    info: "#3b82f6", // Optional: for charts/tooltips
    orange: "#fb923c", // Flagged
  },
  spacing: {
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
};

// Expanded chart colors to cover all statuses consistently
export const CHART_COLORS = [
  theme.colors.success,     // Present
  theme.colors.danger,      // Absent
  theme.colors.warning,     // Late
  theme.colors.mutedTeal,   // Excused
  theme.colors.orange,      // Flagged
  theme.colors.cerulean,    // Extra for trend lines
];
