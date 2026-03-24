import React from 'react';

export const Table = ({ headers = [], children, className = '' }) => (
  <div className={`overflow-x-auto rounded-xl border border-white/8 ${className}`}>
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-white/[0.04] border-b border-white/8">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">{children}</tbody>
    </table>
  </div>
);

export const Tr = ({ children, className = '' }) => (
  <tr className={`hover:bg-white/[0.03] transition-colors ${className}`}>{children}</tr>
);

export const Td = ({ children, className = '' }) => (
  <td className={`px-4 py-3 text-slate-300 ${className}`}>{children}</td>
);

export default Table;
