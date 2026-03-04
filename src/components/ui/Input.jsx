import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  placeholder = '',
  className = '',
  ...props 
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-2 font-medium text-sm text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-slate-600 rounded-lg text-sm bg-dark-bg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  required = false,
  className = '',
  ...props 
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-2 font-medium text-sm text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-slate-600 rounded-lg text-sm bg-dark-bg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const TextArea = ({ 
  label, 
  value, 
  onChange, 
  rows = 3,
  required = false,
  placeholder = '',
  className = '',
  ...props 
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-2 font-medium text-sm text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-slate-600 rounded-lg text-sm bg-dark-bg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export default Input;
