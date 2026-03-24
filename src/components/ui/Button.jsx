import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-blue-600/80 hover:bg-blue-500/90 border-blue-500/30 text-white shadow-glow-blue',
  secondary: 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300',
  success: 'bg-emerald-600/80 hover:bg-emerald-500/90 border-emerald-500/30 text-white',
  danger: 'bg-red-600/80 hover:bg-red-500/90 border-red-500/30 text-white',
  ghost: 'bg-transparent hover:bg-white/5 border-transparent text-slate-400 hover:text-slate-200',
};

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '', icon: Icon }) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.97 }}
    className={`
      flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
      backdrop-blur-sm border transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${className}
    `}
  >
    {Icon && <Icon size={16} />}
    {children}
  </motion.button>
);

export default Button;
