import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Calendar, FileText, Activity, LogOut, Menu, X, Crown } from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => { logout(); navigate("/login"); };

  const getNavItems = () => {
    const base = [{ path: `/${user.role}`, icon: Home, label: "Dashboard" }];
    if (user.role === "admin" || user.role === "doctor") {
      base.push(
        { path: "/patients", icon: Users, label: "Patients" },
        { path: "/appointments", icon: Calendar, label: "Appointments" },
        { path: "/prescriptions", icon: FileText, label: "Prescriptions" },
        { path: "/diagnosis", icon: Activity, label: "AI Diagnosis" },
      );
    } else if (user.role === "receptionist") {
      base.push(
        { path: "/patients", icon: Users, label: "Patients" },
        { path: "/appointments", icon: Calendar, label: "Appointments" },
      );
    } else if (user.role === "patient") {
      base.push(
        { path: "/my-appointments", icon: Calendar, label: "My Appointments" },
        { path: "/my-prescriptions", icon: FileText, label: "My Prescriptions" },
        { path: "/my-history", icon: Activity, label: "Medical History" },
      );
    }
    return base;
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1e] relative">
      {/* Background orbs */}
      <div className="bg-orb w-96 h-96 bg-blue-600 top-0 left-0 fixed" />
      <div className="bg-orb w-80 h-80 bg-cyan-500 bottom-0 right-0 fixed" />

      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-20 flex flex-col h-full
                   bg-white/[0.03] backdrop-blur-2xl border-r border-white/8 shadow-glass"
      >
        {/* Logo */}
        <div className="p-4 h-[72px] flex items-center overflow-hidden border-b border-white/8">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue flex-shrink-0">
                  <Activity size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-gradient truncate">AI Clinic</h2>
                  <p className="text-[10px] text-slate-500 truncate">Management System</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mx-auto">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                  <Activity size={16} className="text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User info */}
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mx-3 mt-3 p-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-200 truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider
                  ${user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                    : user.role === 'doctor' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'}`}>
                  {user.role}
                </span>
                {user.subscriptionPlan === 'pro' && (
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <Crown size={10} /><span className="text-[9px] font-bold">PRO</span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-glow-blue'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'}`}
              >
                <item.icon size={18} className={`flex-shrink-0 ${isActive ? 'text-blue-400' : 'group-hover:scale-110 transition-transform'}`} />
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </motion.span>
                )}
                {isActive && sidebarOpen && (
                  <motion.div layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/8">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl
                       text-slate-400 hover:text-red-400 hover:bg-red-500/10
                       border border-transparent hover:border-red-500/20
                       transition-all duration-200 group">
            <LogOut size={18} className="flex-shrink-0 group-hover:rotate-12 transition-transform" />
            {sidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm font-medium">Logout</motion.span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <header className="h-[72px] bg-white/[0.03] backdrop-blur-2xl border-b border-white/8
                           flex items-center px-6 justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold text-slate-200">Clinic Management</h1>
              <p className="text-xs text-slate-500">{location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-500 hidden sm:block">System Online</span>
          </div>
        </header>

        {/* Content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-auto p-6"
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
