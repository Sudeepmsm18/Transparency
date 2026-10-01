export const phases = [
  { id: 'p1', name: 'Phase 1', houses: 120, residents: 340 },
  { id: 'p2', name: 'Phase 2', houses: 85, residents: 210 },
  { id: 'p3', name: 'Phase 3', houses: 200, residents: 600 },
];

export const cameras = [
  { id: 'CAM-001', name: 'Main Gate Entry', phase: 'p1', location: 'Main Gate', type: 'PTZ', status: 'Working', lastMaintenance: '2023-09-10' },
  { id: 'CAM-002', name: 'Main Gate Exit', phase: 'p1', location: 'Main Gate', type: 'Bullet', status: 'Working', lastMaintenance: '2023-09-10' },
  { id: 'CAM-003', name: 'Sector A Cross', phase: 'p1', location: 'Sector A', type: 'Dome', status: 'Not Working', lastMaintenance: '2023-05-15' },
  { id: 'CAM-004', name: 'Phase 2 Entrance', phase: 'p2', location: 'Gate 2', type: 'Bullet', status: 'Under Maintenance', lastMaintenance: '2023-10-01' },
  { id: 'CAM-005', name: 'Park View', phase: 'p3', location: 'Central Park', type: 'PTZ', status: 'Working', lastMaintenance: '2023-08-20' },
];

export const securityIssues = [
  { id: 'ISS-101', category: 'Trespassing', description: 'Unauthorized person near Phase 2 boundary', phase: 'p2', priority: 'High', status: 'In Progress', reportedBy: 'Guard Smith', date: '2023-10-25' },
  { id: 'ISS-102', category: 'Vandalism', description: 'Broken street light at Sector A', phase: 'p1', priority: 'Medium', status: 'Open', reportedBy: 'Resident John', date: '2023-10-26' },
  { id: 'ISS-103', category: 'Suspicious Activity', description: 'Vehicle parked for 3 days at empty plot', phase: 'p3', priority: 'Low', status: 'Resolved', reportedBy: 'Guard Alan', date: '2023-10-20' },
];

export const visitors = [
  { id: 'V-1001', name: 'Raj Kumar', mobile: '9876543210', hostHouse: 'P1-104', purpose: 'Delivery', vehicleNumber: 'KA-01-AB-1234', gate: 'Main Gate', entryTime: '10:15 AM', exitTime: '10:30 AM', status: 'Exited' },
  { id: 'V-1002', name: 'Anita Sharma', mobile: '9876543211', hostHouse: 'P2-45', purpose: 'Guest', vehicleNumber: '', gate: 'Gate 2', entryTime: '11:00 AM', exitTime: null, status: 'Inside' },
  { id: 'V-1003', name: 'Ramesh (Plumber)', mobile: '9876543212', hostHouse: 'P3-200', purpose: 'Service', vehicleNumber: 'KA-03-XY-9876', gate: 'Main Gate', entryTime: '09:00 AM', exitTime: '11:30 AM', status: 'Exited' },
];

export const payments = [
  { id: 'PAY-001', resident: 'John Doe', house: 'P1-104', phase: 'p1', period: 'Oct 2023', amountDue: 1500, amountPaid: 1500, status: 'Paid', date: '2023-10-05' },
  { id: 'PAY-002', resident: 'Jane Smith', house: 'P2-45', phase: 'p2', period: 'Oct 2023', amountDue: 1500, amountPaid: 0, status: 'Overdue', date: null },
  { id: 'PAY-003', resident: 'Bob Johnson', house: 'P3-200', phase: 'p3', period: 'Oct 2023', amountDue: 1500, amountPaid: 500, status: 'Partially Paid', date: '2023-10-10' },
];

export const expenses = [
  { id: 'EXP-101', category: 'Security', description: 'Monthly Guard Agency Fee', amount: 45000, date: '2023-10-01', status: 'Paid' },
  { id: 'EXP-102', category: 'Maintenance', description: 'Park Landscaping', amount: 12000, date: '2023-10-15', status: 'Paid' },
  { id: 'EXP-103', category: 'CCTV', description: 'Camera Repair Phase 1', amount: 3500, date: '2023-10-22', status: 'Pending Approval' },
];

export const dashboardStats = {
  visitorsToday: 42,
  vehiclesToday: 156,
  activeSecurityIssues: 2,
  totalCameras: 18,
  camerasNotWorking: 2,
  streetLightsNotWorking: 4,
  patrolsCompleted: 6,
  totalPatrols: 8,
  vacantHouses: 5,
  paymentCollectionPercent: 82,
};
