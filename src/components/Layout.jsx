import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Users, Calendar, FileText, Activity, LogOut, 
  Menu, X, Crown 
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { path: `/${user.role}`, icon: Home, label: 'Dashboard' },
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { path: '/patients', icon: Users, label: 'Patients' },
        { path: '/appointments', icon: Calendar, label: 'Appointments' },
        { path: '/prescriptions', icon: FileText, label: 'Prescriptions' },
        { path: '/diagnosis', icon: Activity, label: 'AI Diagnosis' },
      ];
    }

    if (user.role === 'doctor') {
      return [
        ...baseItems,
        { path: '/patients', icon: Users, label: 'Patients' },
        { path: '/appointments', icon: Calendar, label: 'Appointments' },
        { path: '/prescriptions', icon: FileText, label: 'Prescriptions' },
        { path: '/diagnosis', icon: Activity, label: 'AI Diagnosis' },
      ];
    }

    if (user.role === 'receptionist') {
      return [
        ...baseItems,
        { path: '/patients', icon: Users, label: 'Patients' },
        { path: '/appointments', icon: Calendar, label: 'Appointments' },
      ];
    }

    if (user.role === 'patient') {
      return [
        ...baseItems,
        { path: '/my-appointments', icon: Calendar, label: 'My Appointments' },
        { path: '/my-prescriptions', icon: FileText, label: 'My Prescriptions' },
        { path: '/my-history', icon: Activity, label: 'Medical History' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-800 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-5">
          <h2 className="text-xl mb-2.5">AI Clinic</h2>
          <p className="text-xs text-slate-400">
            {user.name} ({user.role})
          </p>
          {user.subscriptionPlan === 'pro' && (
            <div className="flex items-center gap-1.5 mt-1.5 text-amber-400">
              <Crown size={14} />
              <span className="text-xs">Pro Plan</span>
            </div>
          )}
        </div>

        <nav className="mt-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2.5 px-5 py-3 text-white no-underline hover:bg-slate-700 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-5 py-3 w-full border-0 bg-transparent text-white cursor-pointer hover:bg-slate-700 absolute bottom-5 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-dark-bg">
        {/* Header */}
        <div className="bg-dark-card px-5 py-4 border-b border-dark-border flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-0 bg-transparent cursor-pointer p-1 text-slate-200"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold text-slate-50">
            AI Clinic Management System
          </h1>
        </div>

        {/* Page Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
