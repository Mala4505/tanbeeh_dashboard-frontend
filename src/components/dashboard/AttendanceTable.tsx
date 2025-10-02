import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { attendanceRecords } from '../../utils/mockData';
import Chip from '@mui/material/Chip';
import { useAuth } from '../../context/AuthContext';
import { useFilter } from '../../context/FilterContext';

const AttendanceTable = () => {
  const { canViewAllData } = useAuth();
  const { dateFilter, roomFilter, hizbFilter } = useFilter();
  const [pageSize, setPageSize] = useState(10);

// const filteredRecords = attendanceRecords
//   .map((record, index) => ({ ...record, id: record.id ?? index }))
//   .filter(record => {
//     const dateMatch = !dateFilter || record.date === dateFilter.toISOString().split('T')[0];
//     const roomMatch = !roomFilter || record.room === roomFilter;
//     const hizbMatch = !hizbFilter || record.hizb === hizbFilter;
//     return dateMatch && roomMatch && hizbMatch;
//   });
const filteredRecords = attendanceRecords.map((record, index) => ({
  ...record,
  id: record.id ?? index,
}));


  const columns: GridColDef[] = [
    { field: 'studentName', headerName: 'Student Name', flex: 1, minWidth: 150 },
    { field: 'room', headerName: 'Room', flex: 0.5, minWidth: 100 },
    { field: 'hizb', headerName: 'Hizb', flex: 0.5, minWidth: 100 },
    { field: 'date', headerName: 'Date', flex: 0.7, minWidth: 100 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Present' ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      ),
    },
    { field: 'arrivalTime', headerName: 'Arrival Time', flex: 0.7, minWidth: 120 },
    { field: 'notes', headerName: 'Notes', flex: 1, minWidth: 150 },
  ];

  return (
    <div className="mt-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
      <div style={{ height: 400 }}>
        <DataGrid
          rows={filteredRecords}
          columns={columns}
          pagination
          paginationModel={{ pageSize, page: 0 }}
          onPaginationModelChange={(model) => setPageSize(model.pageSize)}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density="standard"
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceTable;
