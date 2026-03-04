import React from 'react';

export const Table = ({ children, className = '' }) => (
  <div className={`bg-dark-card rounded-lg shadow-md overflow-hidden border border-dark-border ${className}`}>
    <table className="w-full border-collapse">
      {children}
    </table>
  </div>
);

export const TableHead = ({ children }) => (
  <thead className="bg-dark-bg">
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '' }) => (
  <tr className={`border-t border-dark-border ${className}`}>
    {children}
  </tr>
);

export const TableHeader = ({ children, className = '' }) => (
  <th className={`px-3 py-3 text-left font-semibold text-slate-400 ${className}`}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-3 py-3 text-slate-200 ${className}`}>
    {children}
  </td>
);

export default Table;
