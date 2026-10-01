import { localDb } from "./localDb";

export const dashboardService = {
  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localDb.getDashboardStats());
      }, 500);
    });
  },

  getRecentIssues: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localDb.getSecurityIssues().slice(0, 5));
      }, 500);
    });
  },

  getRecentVisitors: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localDb.getVisitors().slice(0, 5));
      }, 500);
    });
  },
  
  getExpenseSummary: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localDb.getExpenses());
      }, 500);
    });
  },

  getAnnouncements: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localDb.getAnnouncements().slice(0, 5));
      }, 500);
    });
  }
};

