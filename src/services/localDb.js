// Initialize local storage empty, without mock data for demo purposes.
// Only setting up default structural data like phases so dropdowns work.
const defaultPhases = [
  { id: 'p1', name: 'Phase 1' },
  { id: 'p2', name: 'Phase 2' },
  { id: 'p3', name: 'Phase 3' },
  { id: 'p4', name: 'Phase 4' },
  { id: 'p5', name: 'Phase 5' },
  { id: 'p6', name: 'Phase 6' },
  { id: 's1', name: 'Sector 1' },
  { id: 's2', name: 'Sector 2' },
];

const initializeDb = () => {
  if (!localStorage.getItem('securecomm_demo_v7_initialized')) {
    localStorage.setItem('phases', JSON.stringify(defaultPhases));
    
    // Add some dummy data so dashboard isn't completely empty
    // Generate 30 street lights
    const dummyInfrastructure = Array.from({ length: 30 }, (_, i) => ({
      id: `INF-${100 + i}`,
      name: `Street Light ${i + 1}`,
      type: 'Streetlight',
      phase: i < 10 ? 'p1' : i < 20 ? 'p2' : 'p3',
      location: `Pole ${i + 1}`,
      status: i < 27 ? 'Working' : 'Faulty'
    }));
    
    const dummyExpenses = [
      { id: 'EXP-1001', title: 'Gardening Services', category: 'Maintenance', amount: 15000, date: new Date().toISOString().split('T')[0], phase: 'All', approvedBy: 'Admin' },
      { id: 'EXP-1002', title: 'Gate Repair', category: 'Repairs', amount: 4500, date: new Date().toISOString().split('T')[0], phase: 'p1', approvedBy: 'Admin' },
      { id: 'EXP-1003', title: 'Security Staff Diwali Bonus', category: 'Staff', amount: 25000, date: new Date().toISOString().split('T')[0], phase: 'All', approvedBy: 'Admin' },
    ];
    
    const dummyPayments = [
      { id: 'PAY-1001', houseId: 'A-101', type: 'Maintenance', amount: 3500, date: new Date().toISOString().split('T')[0], status: 'Paid', phase: 'p1', residentName: 'Rahul Sharma' },
      { id: 'PAY-1002', houseId: 'B-205', type: 'Maintenance', amount: 3500, date: new Date().toISOString().split('T')[0], status: 'Pending', phase: 'p2', residentName: 'Anita Desai' },
      { id: 'PAY-1003', houseId: 'A-102', type: 'Sinking Fund', amount: 1500, date: new Date().toISOString().split('T')[0], status: 'Paid', phase: 'p1', residentName: 'Vikram Singh' },
    ];

    const dummyPatrols = [
      { id: 'PAT-1001', guard: 'Ramu', route: 'Phase 1 Perimeter', status: 'Completed', date: new Date().toISOString().split('T')[0], time: '10:00', phase: 'p1' },
      { id: 'PAT-1002', guard: 'Shyam', route: 'Phase 2 Internal', status: 'Completed', date: new Date().toISOString().split('T')[0], time: '12:00', phase: 'p2' },
      { id: 'PAT-1003', guard: 'Ramu', route: 'Main Gate', status: 'Missed / Incomplete', date: new Date().toISOString().split('T')[0], time: '14:00', phase: 'All' },
    ];

    // Generate 40 cameras: 35 working, 5 faulty
    const dummyCameras = Array.from({ length: 40 }, (_, i) => ({
      id: `CAM-${String(i + 1).padStart(3, '0')}`,
      name: `Camera ${i + 1}`,
      location: `Location ${i + 1}`,
      type: i % 2 === 0 ? 'Bullet' : 'Dome',
      status: i < 35 ? 'Working' : 'Not Working',
      phase: i < 15 ? 'p1' : i < 25 ? 'p2' : 'p3'
    }));
    
    const dummyIssues = [
      { id: 'ISS-101', category: 'Suspicious Activity', description: 'Unknown person wandering near Block B', priority: 'High', status: 'Open', phase: 'p2', reportedBy: 'Admin', date: new Date().toISOString().split('T')[0] }
    ];

    const dummyVisitors = [
      { id: 'V-1001', name: 'Ramesh Singh', mobile: '9876543210', hostHouse: 'A-101', purpose: 'Delivery', vehicleNumber: 'KA-01-AB-1234', gate: 'Main gate', phase: 'p1', sector: 's1', entryTime: '10:15', exitTime: '10:45', status: 'Exited' },
      { id: 'V-1002', name: 'Suresh Kumar', mobile: '9876543211', hostHouse: 'B-205', purpose: 'Service', vehicleNumber: 'KA-02-CD-5678', gate: 'Main gate', phase: 'p2', sector: 's2', entryTime: '14:30', exitTime: null, status: 'Inside' },
      { id: 'V-1003', name: 'Amit Patel', mobile: '9876543212', hostHouse: 'C-304', purpose: 'Guest', vehicleNumber: '', gate: 'Pending', phase: 'p3', sector: '', entryTime: 'Expected 2026-10-05 18:00', exitTime: null, status: 'Pre-approved' }
    ];

    const dummyAnnouncements = [
      { id: 'ANN-101', title: 'Water Supply Interruption', content: 'Water supply will be interrupted in Phase 1 from 2 PM to 5 PM today for maintenance.', target: 'Phase 1 Only', priority: 'High', date: new Date().toISOString() },
      { id: 'ANN-102', title: 'Upcoming Festival Celebration', content: 'Join us for the Diwali celebration at the Central Park next Friday at 6 PM.', target: 'All Residents', priority: 'Normal', date: new Date().toISOString() }
    ];

    const dummyVehicles = [
      { id: 'VEH-1001', owner: 'Rahul Sharma', houseId: 'A-101', type: 'Car', number: 'KA-01-AB-1234', makeModel: 'Honda City', phase: 'p1', sector: 's1', date: new Date().toISOString().split('T')[0] },
      { id: 'VEH-1002', owner: 'Anita Desai', houseId: 'B-205', type: 'Two-Wheeler', number: 'KA-05-XY-9876', makeModel: 'Honda Activa', phase: 'p2', sector: '', date: new Date().toISOString().split('T')[0] }
    ];

    const dummyCommittee = [
      { id: 'COM-101', name: 'Ravi Verma', role: 'President', contact: '9988776655', phase: 'p1', sector: 's1' },
      { id: 'COM-102', name: 'Sneha Rao', role: 'Secretary', contact: '9988776656', phase: 'p2', sector: '' }
    ];

    const dummyServiceProviders = [
      { id: 'SRV-101', name: 'Raju Plumber', serviceType: 'Plumber', contact: '9876543210', verified: true, phase: 'All' },
      { id: 'SRV-102', name: 'A-1 Electricians', serviceType: 'Electrician', contact: '9876543211', verified: true, phase: 'All' },
      { id: 'SRV-103', name: 'Cool Care AC', serviceType: 'AC Repair', contact: '9876543212', verified: false, phase: 'p1' }
    ];

    localStorage.setItem('cameras', JSON.stringify(dummyCameras));
    localStorage.setItem('securityIssues', JSON.stringify(dummyIssues));
    localStorage.setItem('visitors', JSON.stringify(dummyVisitors));
    localStorage.setItem('payments', JSON.stringify(dummyPayments));
    localStorage.setItem('expenses', JSON.stringify(dummyExpenses));
    localStorage.setItem('announcements', JSON.stringify(dummyAnnouncements));
    localStorage.setItem('infrastructure', JSON.stringify(dummyInfrastructure));
    localStorage.setItem('vehicles', JSON.stringify(dummyVehicles));
    localStorage.setItem('patrols', JSON.stringify(dummyPatrols));
    localStorage.setItem('guards', JSON.stringify([])); // Deprecated
    localStorage.setItem('committee', JSON.stringify(dummyCommittee));
    localStorage.setItem('serviceProviders', JSON.stringify(dummyServiceProviders));
    localStorage.setItem('dashboardStats', JSON.stringify({}));
    localStorage.setItem('users', JSON.stringify([
      { id: 'USR-101', name: 'Sudeep', role: 'Volunteer', phase: 'p1', sector: 's1', contact: '9876543210' },
      { id: 'USR-102', name: 'John Doe', role: 'Community Member', phase: 'p2', sector: '', contact: '9876543211' },
      { id: 'USR-103', name: 'Ramu Guard', role: 'Guard', phase: 'p1', sector: 's1', contact: '9876543212', shift: 'Day' },
      { id: 'USR-104', name: 'Shyam Guard', role: 'Guard', phase: 'p2', sector: '', contact: '9876543213', shift: 'Night' }
    ]));
    localStorage.setItem('securecomm_demo_v7_initialized', 'true');
  }
};

initializeDb();

export const localDb = {
  get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  deleteItem: (key, id) => {
    const items = localDb.get(key);
    localDb.set(key, items.filter(item => item.id !== id));
  },

  // Specific entity helpers
  getVisitors: () => localDb.get('visitors'),
  addVisitor: (visitor) => {
    const visitors = localDb.get('visitors');
    const newVisitor = { ...visitor, id: `V-${1000 + visitors.length + 1}` };
    localDb.set('visitors', [newVisitor, ...visitors]);
    return newVisitor;
  },
  updateVisitor: (id, updates) => {
    const visitors = localDb.get('visitors');
    const index = visitors.findIndex(v => v.id === id);
    if (index > -1) {
      visitors[index] = { ...visitors[index], ...updates };
      localDb.set('visitors', visitors);
    }
  },

  getCameras: () => localDb.get('cameras'),
  addCamera: (camera) => {
    const cameras = localDb.get('cameras');
    const newCamera = { ...camera, id: `CAM-${String(cameras.length + 1).padStart(3, '0')}` };
    localDb.set('cameras', [newCamera, ...cameras]);
    return newCamera;
  },
  updateCamera: (id, updates) => {
    const cameras = localDb.get('cameras');
    const index = cameras.findIndex(c => c.id === id);
    if (index > -1) {
      cameras[index] = { ...cameras[index], ...updates };
      localDb.set('cameras', cameras);
    }
  },
  deleteCamera: (id) => localDb.deleteItem('cameras', id),

  getSecurityIssues: () => localDb.get('securityIssues'),
  addSecurityIssue: (issue) => {
    const issues = localDb.get('securityIssues');
    const newIssue = { ...issue, id: `ISS-${100 + issues.length + 1}` };
    localDb.set('securityIssues', [newIssue, ...issues]);
    return newIssue;
  },
  updateSecurityIssue: (id, updates) => {
    const issues = localDb.get('securityIssues');
    const index = issues.findIndex(i => i.id === id);
    if (index > -1) {
      issues[index] = { ...issues[index], ...updates };
      localDb.set('securityIssues', issues);
    }
  },
  deleteSecurityIssue: (id) => localDb.deleteItem('securityIssues', id),

  getPayments: () => localDb.get('payments'),
  addPayment: (payment) => {
    const payments = localDb.get('payments');
    const newPayment = { ...payment, id: `PAY-${1000 + payments.length + 1}` };
    localDb.set('payments', [newPayment, ...payments]);
    return newPayment;
  },
  updatePayment: (id, updates) => {
    const payments = localDb.get('payments');
    const index = payments.findIndex(p => p.id === id);
    if (index > -1) {
      payments[index] = { ...payments[index], ...updates };
      localDb.set('payments', payments);
    }
  },

  getExpenses: () => localDb.get('expenses'),
  addExpense: (expense) => {
    const expenses = localDb.get('expenses');
    const newExpense = { ...expense, id: `EXP-${1000 + expenses.length + 1}` };
    localDb.set('expenses', [newExpense, ...expenses]);
    return newExpense;
  },

  getAnnouncements: () => localDb.get('announcements'),
  addAnnouncement: (announcement) => {
    const announcements = localDb.get('announcements');
    const newAnnouncement = { ...announcement, id: `ANN-${100 + announcements.length + 1}`, date: new Date().toISOString() };
    localDb.set('announcements', [newAnnouncement, ...announcements]);
    return newAnnouncement;
  },

  getInfrastructure: () => localDb.get('infrastructure'),
  addInfrastructure: (item) => {
    const items = localDb.get('infrastructure');
    const newItem = { ...item, id: `INF-${100 + items.length + 1}` };
    localDb.set('infrastructure', [newItem, ...items]);
    return newItem;
  },
  updateInfrastructure: (id, updates) => {
    const items = localDb.get('infrastructure');
    const index = items.findIndex(i => i.id === id);
    if (index > -1) {
      items[index] = { ...items[index], ...updates };
      localDb.set('infrastructure', items);
    }
  },
  deleteInfrastructure: (id) => localDb.deleteItem('infrastructure', id),

  getVehicles: () => localDb.get('vehicles'),
  addVehicle: (vehicle) => {
    const vehicles = localDb.get('vehicles');
    const newVehicle = { ...vehicle, id: `VEH-${1000 + vehicles.length + 1}`, date: new Date().toISOString().split('T')[0] };
    localDb.set('vehicles', [newVehicle, ...vehicles]);
    return newVehicle;
  },
  deleteVehicle: (id) => localDb.deleteItem('vehicles', id),

  getGuards: () => localDb.get('guards'),
  addGuard: (guard) => {
    const guards = localDb.get('guards');
    const newGuard = { ...guard, id: `GRD-${100 + guards.length + 1}` };
    localDb.set('guards', [newGuard, ...guards]);
    return newGuard;
  },
  deleteGuard: (id) => localDb.deleteItem('guards', id),

  getPatrols: () => localDb.get('patrols'),
  addPatrol: (patrol) => {
    const patrols = localDb.get('patrols');
    const newPatrol = { ...patrol, id: `PAT-${1000 + patrols.length + 1}`, date: new Date().toISOString().split('T')[0] };
    localDb.set('patrols', [newPatrol, ...patrols]);
    return newPatrol;
  },
  deletePatrol: (id) => localDb.deleteItem('patrols', id),

  getUsers: () => localDb.get('users'),
  addUser: (user) => {
    const users = localDb.get('users');
    const newUser = { ...user, id: `USR-${100 + users.length + 1}` };
    localDb.set('users', [newUser, ...users]);
    return newUser;
  },
  deleteUser: (id) => localDb.deleteItem('users', id),

  getCommittee: () => localDb.get('committee'),
  addCommitteeMember: (member) => {
    const members = localDb.get('committee');
    const newMember = { ...member, id: `COM-${100 + members.length + 1}` };
    localDb.set('committee', [newMember, ...members]);
    return newMember;
  },
  deleteCommitteeMember: (id) => localDb.deleteItem('committee', id),

  getServiceProviders: () => localDb.get('serviceProviders'),
  addServiceProvider: (provider) => {
    const providers = localDb.get('serviceProviders');
    const newProvider = { ...provider, id: `SRV-${100 + providers.length + 1}` };
    localDb.set('serviceProviders', [newProvider, ...providers]);
    return newProvider;
  },
  deleteServiceProvider: (id) => localDb.deleteItem('serviceProviders', id),

  getDashboardStats: (phaseFilter = 'All') => {
    let visitors = localDb.get('visitors');
    let cameras = localDb.get('cameras');
    let issues = localDb.get('securityIssues');
    let payments = localDb.get('payments');
    let expenses = localDb.get('expenses');
    let vehicles = localDb.get('vehicles');
    let patrols = localDb.get('patrols');
    let infrastructure = localDb.get('infrastructure');

    if (phaseFilter !== 'All') {
      visitors = visitors.filter(v => v.phase === phaseFilter || !v.phase);
      cameras = cameras.filter(c => c.phase === phaseFilter);
      issues = issues.filter(i => i.phase === phaseFilter || !i.phase);
      payments = payments.filter(p => p.phase === phaseFilter || !p.phase);
      expenses = expenses.filter(e => e.phase === phaseFilter || !e.phase);
      vehicles = vehicles.filter(v => v.phase === phaseFilter || !v.phase);
      patrols = patrols.filter(p => p.phase === phaseFilter || !p.phase);
      infrastructure = infrastructure.filter(i => i.phase === phaseFilter || !i.phase);
    }

    const activeIssues = issues.filter(i => i.status === "Open" || i.status === "In Progress").length;
    const faultyCameras = cameras.filter(c => c.status === "Not Working").length;
    const visitorsToday = visitors.filter(v => v.status === "Inside" || v.status === "Exited").length;

    const totalCollected = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + Number(p.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + Number(p.amount), 0);
    const savingsAmount = totalCollected - totalExpenses;
    
    const streetLightsCount = infrastructure.filter(i => i.type === 'Streetlight').length;

    // Calculate dynamic 7-day visitor trend
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const visitorTrend = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : days[d.getDay()];

      const count = visitors.filter(v => {
        const vDate = v.date || todayStr; // Assume missing date is today
        return vDate === dateStr;
      }).length;

      visitorTrend.push({ name: dayName, visitors: count });
    }

    // Calculate dynamic CCTV data
    let workingCameras = 0;

    if (cameras.length > 0) {
      workingCameras = cameras.length - faultyCameras;
    }

    const cctvTrend = cameras.length === 0
      ? [{ name: 'No of Cameras', value: 1, color: '#e5e7eb' }]
      : [
        { name: 'Working', value: workingCameras, color: '#22c55e' },
        { name: 'Faulty', value: faultyCameras, color: '#ef4444' },
      ];

    const patrolsCompleted = patrols.filter(p => p.status === 'Completed').length;

    return {
      visitorsToday,
      vehiclesToday: vehicles.length, // Showing registered vehicles as 'Vehicles Today'
      activeSecurityIssues: activeIssues,
      totalCameras: cameras.length,
      camerasNotWorking: faultyCameras,
      streetLightsNotWorking: 0,
      patrolsCompleted: patrolsCompleted,
      totalPatrols: patrols.length,
      vacantHouses: 0,
      totalCollected,
      totalExpenses,
      pendingPayments,
      savingsAmount,
      streetLightsCount,
      visitorTrend,
      cctvTrend
    };
  }
};

