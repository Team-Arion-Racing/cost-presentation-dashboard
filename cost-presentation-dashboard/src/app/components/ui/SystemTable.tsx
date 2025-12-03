"use client";
import React from 'react';

export type PartData = {
  id: string;
  system: string;
  name: string;
  qty: number;
  type: "Make" | "Buy";
};

type SystemTableProps = {
  title: string;
  systemCode: string;
  parts: PartData[];
};

const SystemTable = ({ title, systemCode, parts }: SystemTableProps) => {
  // Calculate Stats
  const totalParts = parts.reduce((acc, part) => acc + part.qty, 0);
  const makeCount = parts.filter(p => p.type === "Make").length;
  const buyCount = parts.filter(p => p.type === "Buy").length;

  return (
    <div className="w-full mb-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-sans">
      
      {/* HEADER: Dashboard Metrics */}
      <div className="p-6 border-b border-slate-800 bg-slate-950">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white font-mono">{systemCode}</span>
              {title}
            </h2>
            <p className="text-slate-400 text-sm mt-1">Assembly Breakdown</p>
          </div>
          
          <div className="flex gap-6">
             <div className="text-center">
                <span className="block text-2xl font-bold text-white">{totalParts}</span>
                <span className="text-xs text-slate-500 uppercase">Total Qty</span>
             </div>
             <div className="text-center px-6 border-l border-slate-800">
                <span className="block text-2xl font-bold text-emerald-400">{makeCount}</span>
                <span className="text-xs text-slate-500 uppercase">Make</span>
             </div>
             <div className="text-center px-6 border-l border-slate-800">
                <span className="block text-2xl font-bold text-blue-400">{buyCount}</span>
                <span className="text-xs text-slate-500 uppercase">Buy</span>
             </div>
          </div>
        </div>
      </div>

      {/* BODY: Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900/50 uppercase font-medium text-slate-500 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Part ID</th>
              <th className="px-6 py-4">Component Name</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4 text-right">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {parts.map((part, index) => (
              <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-500">{part.id}</td>
                <td className="px-6 py-4 font-medium text-white">{part.name}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs border border-slate-700">
                    x{part.qty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    part.type === 'Make' 
                      ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900' 
                      : 'bg-blue-900/20 text-blue-400 border border-blue-900'
                  }`}>
                    {part.type.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemTable;