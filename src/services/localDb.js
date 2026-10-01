// Initialize local storage empty, without mock data for demo purposes.
// Only setting up default structural data like phases so dropdowns work.
const defaultPhases = [
  { id: 'p1', name: 'Phase 1' },
  { id: 'p2', name: 'Phase 2' },
  { id: 'p3', name: 'Phase 3' },
];

const initializeDb = () => {
  if (!localStorage.getItem('securecomm_demo_v2_initialized')) {
    localStorage.setItem('phases', JSON.stringify(defaultPhases));
    localStorage.setItem('cameras', JSON.stringify([]));
    localStorage.setItem('securityIssues', JSON.stringify([]));
    localStorage.setItem('visitors', JSON.stringify([]));
    localStorage.setItem('payments', JSON.stringify([]));
    localStorage.setItem('expenses', JSON.stringify([]));
    localStorage.setItem('announcements', JSON.stringify([]));
    localStorage.setItem('infrastructure', JSON.stringify([]));
    localStorage.setItem('vehicles', JSON.stringify([]));
    localStorage.setItem('patrols', JSON.stringify([]));
    localStorage.setItem('committee', JSON.stringify([]));
    localStorage.setItem('serviceProviders', JSON.stringify([]));
    localStorage.setItem('dashboardStats', JSON.stringify({}));
    localStorage.setItem('securecomm_demo_v2_initialized', 'true');
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

  getPatrols: () => localDb.get('patrols'),
  addPatrol: (patrol) => {
    const patrols = localDb.get('patrols');
    const newPatrol = { ...patrol, id: `PAT-${1000 + patrols.length + 1}`, date: new Date().toISOString().split('T')[0] };
    localDb.set('patrols', [newPatrol, ...patrols]);
    return newPatrol;
  },
  deletePatrol: (id) => localDb.deleteItem('patrols', id),

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

  getDashboardStats: () => {
    const visitors = localDb.get('visitors');
    const cameras = localDb.get('cameras');
    const issues = localDb.get('securityIssues');
    const payments = localDb.get('payments');
    const expenses = localDb.get('expenses');
    const vehicles = localDb.get('vehicles');
    const patrols = localDb.get('patrols');

    const activeIssues = issues.filter(i => i.status === "Open" || i.status === "In Progress").length;
    const faultyCameras = cameras.filter(c => c.status === "Not Working").length;
    const visitorsToday = visitors.filter(v => v.status === "Inside" || v.status === "Exited").length;

    const totalCollected = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + Number(p.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + Number(p.amount), 0);

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
      visitorTrend,
      cctvTrend
    };
  }
};

