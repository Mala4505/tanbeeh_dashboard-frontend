export const roles = ['Admin', 'Prefect', 'Deputy', 'Lajnat'];

export const accessMatrixDefaults = {
  Admin: {
    'Attendance Summary': true,
    'Late Arrivals': true,
    'Flagged Students': true,
    'Export Data': true,
  },
  Prefect: {
    'Attendance Summary': true,
    'Late Arrivals': true,
    'Flagged Students': true,
    'Export Data': false,
  },
  Deputy: {
    'Attendance Summary': true,
    'Late Arrivals': false,
    'Flagged Students': true,
    'Export Data': false,
  },
  Lajnat: {
    'Attendance Summary': false,
    'Late Arrivals': false,
    'Flagged Students': true,
    'Export Data': false,
  },
};
