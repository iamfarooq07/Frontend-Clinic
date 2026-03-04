import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-dark-card p-5 rounded-lg shadow-md border border-dark-border ${className}`}>
    {children}
  </div>
);

export const StatCard = ({ icon, title, value, color }) => (
  <Card className="flex items-center gap-4">
    <div 
      className="p-3 rounded-lg"
      style={{ 
        color: color, 
        backgroundColor: `${color}30` 
      }}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
    </div>
  </Card>
);

export default Card;
