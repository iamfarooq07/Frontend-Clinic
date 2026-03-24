import React from 'react';

const inputClass = `w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200
  placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40
  focus:border-blue-500/50 backdrop-blur-sm transition-all duration-200`;

export const Input = ({ label, type = 'text', value, onChange, required = false, placeholder = '', className = '', ...props }) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-red-400 normal-case">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={inputClass}
      {...props}
    />
  </div>
);

export const Select = ({ label, value, onChange, options = [], required = false, className = '', ...props }) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-red-400 normal-case">*</span>}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      required={required}
      className={`${inputClass} cursor-pointer`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#0a0f1e]">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const TextArea = ({ label, value, onChange, rows = 3, required = false, placeholder = '', className = '', ...props }) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-red-400 normal-case">*</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className={inputClass}
      {...props}
    />
  </div>
);

export default Input;
