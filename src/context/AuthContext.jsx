import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  VOLUNTEER: "Volunteer",
  GUARD: "Security Guard",
  RESIDENT: "Community Member"
};

export const AuthProvider = ({ children }) => {
  // Try to load role from localStorage, default to Super Admin
  const [role, setRole] = useState(() => {
    return localStorage.getItem('Transparency_demo_role') || ROLES.SUPER_ADMIN;
  });

  const [phase, setPhase] = useState(() => {
    return localStorage.getItem('Transparency_demo_phase') || 'All';
  });

  useEffect(() => {
    localStorage.setItem('Transparency_demo_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('Transparency_demo_phase', phase);
  }, [phase]);

  return (
    <AuthContext.Provider value={{ role, setRole, ROLES, phase, setPhase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
