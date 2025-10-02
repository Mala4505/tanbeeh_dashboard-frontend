import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import AttendanceCharts from '../components/dashboard/AttendanceCharts';
import AttendanceTable from '../components/dashboard/AttendanceTable';
import { attendanceStats, getFilteredStats } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import { useFilter } from '../context/FilterContext';
import Typography from '@mui/material/Typography';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { dateFilter, setDateFilter, roomFilter, setRoomFilter, hizbFilter, setHizbFilter } = useFilter();
  const [stats, setStats] = useState(attendanceStats);

  useEffect(() => {
    const filteredStats = getFilteredStats(dateFilter, roomFilter, hizbFilter);
    setStats(filteredStats);
  }, [dateFilter, roomFilter, hizbFilter]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography variant="h5" component="h1">
          Tanbeeh Dashboard {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last updated: {new Date().toLocaleString()}
        </Typography>
      </div>

      {/* Role-aware message */}
      {!isAdmin && (
        <div className="text-sm text-gray-600">
          You’re viewing attendance for your assigned students only.
        </div>
      )}

      {/* Filter Panel */}
      <div className="flex flex-wrap gap-4 items-center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={dateFilter}
            onChange={(newValue) => setDateFilter(newValue)}
            slotProps={{
              textField: {
                size: 'small',
                sx: { width: 150 },
              },
            }}
          />
        </LocalizationProvider>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="room-filter-label">Room</InputLabel>
          <Select
            labelId="room-filter-label"
            value={roomFilter}
            label="Room"
            onChange={(e) => setRoomFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Room A">Room A</MenuItem>
            <MenuItem value="Room B">Room B</MenuItem>
            <MenuItem value="Room C">Room C</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="hizb-filter-label">Hizb</InputLabel>
          <Select
            labelId="hizb-filter-label"
            value={hizbFilter}
            label="Hizb"
            onChange={(e) => setHizbFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Hizb 1">Hizb 1</MenuItem>
            <MenuItem value="Hizb 2">Hizb 2</MenuItem>
            <MenuItem value="Hizb 3">Hizb 3</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Summary Cards */}
      <SummaryCards stats={stats} />

      {/* Charts */}
      <AttendanceCharts />

      {/* Attendance Table */}
      <AttendanceTable />
    </div>
  );
};

export default Dashboard;
