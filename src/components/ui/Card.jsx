import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', animate = false }) => {
  const base = `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass p-5 ${className}`;
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={base}
      >
        {children}
      </motion.div>
    );
  }
  return <div className={base}>{children}</div>;
};

export const StatCard = ({ icon, title, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass
               hover:bg-white/8 hover:border-white/20 transition-colors duration-300 cursor-default"
  >
    <div className="flex items-center gap-4">
      <div
        className="p-3 rounded-xl"
        style={{ color, backgroundColor: `${color}20`, boxShadow: `0 0 16px ${color}30` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-50">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default Card;
