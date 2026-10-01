import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ASSOC_ADMIN: "Association Admin",
  GUARD: "Security Guard",
  RESIDENT: "Community Member"
};

export const AuthProvider = ({ children }) => {
  // Try to load role from localStorage, default to Super Admin
  const [role, setRole] = useState(() => {
    return localStorage.getItem('securecomm_demo_role') || ROLES.SUPER_ADMIN;
  });

  useEffect(() => {
    localStorage.setItem('securecomm_demo_role', role);
  }, [role]);

  return (
    <AuthContext.Provider value={{ role, setRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
