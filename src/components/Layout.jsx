import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"; // Motion import
import {
  Home,
  Users,
  Calendar,
  FileText,
  Activity,
  LogOut,
  Menu,
  X,
  Crown,
} from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Active link highlight karne ke liye
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNavItems = () => {
    const baseItems = [
      { path: `/${user.role}`, icon: Home, label: "Dashboard" },
    ];
    if (user.role === "admin" || user.role === "doctor") {
      baseItems.push(
        { path: "/patients", icon: Users, label: "Patients" },
        { path: "/appointments", icon: Calendar, label: "Appointments" },
        { path: "/prescriptions", icon: FileText, label: "Prescriptions" },
        { path: "/diagnosis", icon: Activity, label: "AI Diagnosis" },
      );
    } else if (user.role === "receptionist") {
      baseItems.push(
        { path: "/patients", icon: Users, label: "Patients" },
        { path: "/appointments", icon: Calendar, label: "Appointments" },
      );
    } else if (user.role === "patient") {
      baseItems.push(
        { path: "/my-appointments", icon: Calendar, label: "My Appointments" },
        {
          path: "/my-prescriptions",
          icon: FileText,
          label: "My Prescriptions",
        },
        { path: "/my-history", icon: Activity, label: "Medical History" },
      );
    }
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {/* Animated Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 260 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-slate-800 text-white flex flex-col relative z-20 shadow-xl"
      >
        {/* Logo Section */}
        <div className="p-6 h-32 overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="full"
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent truncate">
                  AI Clinic
                </h2>
                <div className="flex items-center gap-3 mt-3 p-2 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                  {/* User Initial Avatar */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-100 truncate leading-tight">
                      {user.name}
                    </span>
                    <span className="flex items-center gap-1.5 mt-0.5">
                      {/* Role Badge */}
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm
        ${
          user.role === "admin"
            ? "bg-red-500/20 text-red-400 border border-red-500/20"
            : user.role === "doctor"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/20"
        }`}
                      >
                        {user.role}
                      </span>
                    </span>
                  </div>
                </div>
                {user.subscriptionPlan === "pro" && (
                  <div className="flex items-center gap-1.5 mt-2 text-amber-400">
                    <Crown size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Pro
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
                key="collapsed"
              >
                <Activity className="text-blue-400" size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <item.icon
                  size={22}
                  className={
                    isActive
                      ? "text-white"
                      : "group-hover:scale-110 transition-transform"
                  }
                />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl
                       text-slate-400 hover:text-red-400 
                       bg-white/5 hover:bg-red-500/10
                       transition-all duration-300 group"
          >
            <LogOut
              size={22}
              className="group-hover:rotate-12 transition-transform"
            />
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0f172a]">
        {/* Header */}
        <header className="h-16 bg-slate-800/50 backdrop-blur-md border-b border-white/5 flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-medium text-slate-200 hidden md:block">
              Clinic Management System
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Yahan aap notifications ya profile icon daal sakte hain */}
          </div>
        </header>

        {/* Page Content with Page Transition */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto p-6"
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
