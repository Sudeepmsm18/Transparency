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
    localStorage.setItem('dashboardStats', JSON.stringify({}));
    localStorage.setItem('securecomm_demo_v2_initialized', 'true');
  }
};

initializeDb();

export const localDb = {
  get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  
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

  getDashboardStats: () => {
    const visitors = localDb.get('visitors');
    const cameras = localDb.get('cameras');
    const issues = localDb.get('securityIssues');
    const payments = localDb.get('payments');
    const expenses = localDb.get('expenses');
    
    const activeIssues = issues.filter(i => i.status === "Open" || i.status === "In Progress").length;
    const faultyCameras = cameras.filter(c => c.status === "Not Working").length;
    const visitorsToday = visitors.filter(v => v.status === "Inside" || v.status === "Exited").length;

    const totalCollected = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + Number(p.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      visitorsToday,
      vehiclesToday: 0, // Placeholder until vehicles module is built
      activeSecurityIssues: activeIssues,
      totalCameras: cameras.length,
      camerasNotWorking: faultyCameras,
      streetLightsNotWorking: 0,
      patrolsCompleted: 0,
      totalPatrols: 0,
      vacantHouses: 0,
      totalCollected,
      totalExpenses,
      pendingPayments
    };
  }
};

