import React from 'react';
// Mock data for the dashboard
export const attendanceStats = {
  totalStudents: 120,
  presentToday: 108,
  absentToday: 12,
  flaggedStudents: 8,
  roomsCovered: 5,
  attendanceRate: 90
};
export const attendanceByRoom = [{
  room: 'Room A',
  present: 25,
  absent: 2
}, {
  room: 'Room B',
  present: 22,
  absent: 3
}, {
  room: 'Room C',
  present: 18,
  absent: 1
}, {
  room: 'Room D',
  present: 23,
  absent: 4
}, {
  room: 'Room E',
  present: 20,
  absent: 2
}];
export const attendanceByDay = [{
  day: 'Mon',
  present: 112,
  absent: 8
}, {
  day: 'Tue',
  present: 110,
  absent: 10
}, {
  day: 'Wed',
  present: 108,
  absent: 12
}, {
  day: 'Thu',
  present: 115,
  absent: 5
}, {
  day: 'Fri',
  present: 105,
  absent: 15
}, {
  day: 'Sat',
  present: 100,
  absent: 20
}, {
  day: 'Sun',
  present: 108,
  absent: 12
}];
export const attendanceByHizb = [{
  hizb: 'Hizb 1',
  present: 35,
  absent: 2
}, {
  hizb: 'Hizb 2',
  present: 28,
  absent: 4
}, {
  hizb: 'Hizb 3',
  present: 45,
  absent: 6
}];
export const attendanceRecords = [{
  id: 1,
  studentName: 'Ahmed Ali',
  room: 'Room A',
  hizb: 'Hizb 1',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:45',
  notes: ''
}, {
  id: 2,
  studentName: 'Fatima Khan',
  room: 'Room B',
  hizb: 'Hizb 2',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:50',
  notes: ''
}, {
  id: 3,
  studentName: 'Mohammed Hassan',
  room: 'Room A',
  hizb: 'Hizb 1',
  date: '2023-10-01',
  status: 'Absent',
  arrivalTime: '-',
  notes: 'Sick leave'
}, {
  id: 4,
  studentName: 'Aisha Mahmoud',
  room: 'Room C',
  hizb: 'Hizb 3',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '09:05',
  notes: 'Late arrival'
}, {
  id: 5,
  studentName: 'Omar Khalid',
  room: 'Room B',
  hizb: 'Hizb 2',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:30',
  notes: ''
}, {
  id: 6,
  studentName: 'Layla Ahmed',
  room: 'Room D',
  hizb: 'Hizb 1',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:40',
  notes: ''
}, {
  id: 7,
  studentName: 'Yusuf Ibrahim',
  room: 'Room A',
  hizb: 'Hizb 3',
  date: '2023-10-01',
  status: 'Absent',
  arrivalTime: '-',
  notes: 'Family emergency'
}, {
  id: 8,
  studentName: 'Noor Ali',
  room: 'Room C',
  hizb: 'Hizb 2',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:35',
  notes: ''
}, {
  id: 9,
  studentName: 'Zainab Mohammed',
  room: 'Room E',
  hizb: 'Hizb 1',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:55',
  notes: ''
}, {
  id: 10,
  studentName: 'Khalid Omar',
  room: 'Room D',
  hizb: 'Hizb 3',
  date: '2023-10-01',
  status: 'Present',
  arrivalTime: '08:45',
  notes: ''
}];
// Filter records based on filters
export const filterRecords = (records: typeof attendanceRecords, date: Date | null, room: string, hizb: string) => {
  return records.filter(record => {
    const dateMatch = !date || record.date === date.toISOString().split('T')[0];
    const roomMatch = !room || record.room === room;
    const hizbMatch = !hizb || record.hizb === hizb;
    return dateMatch && roomMatch && hizbMatch;
  });
};
// Get filtered stats based on filters
export const getFilteredStats = (date: Date | null, room: string, hizb: string) => {
  // In a real app, you would filter based on the actual data
  // For this demo, we'll just return slightly modified stats
  const multiplier = Math.random() * 0.2 + 0.9; // Random between 0.9 and 1.1
  return {
    totalStudents: Math.round(attendanceStats.totalStudents * multiplier),
    presentToday: Math.round(attendanceStats.presentToday * multiplier),
    absentToday: Math.round(attendanceStats.absentToday * multiplier),
    flaggedStudents: Math.round(attendanceStats.flaggedStudents * multiplier),
    roomsCovered: attendanceStats.roomsCovered,
    attendanceRate: Math.round(attendanceStats.attendanceRate * multiplier)
  };
};

