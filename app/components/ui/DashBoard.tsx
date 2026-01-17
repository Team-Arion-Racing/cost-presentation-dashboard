"use client";

import React, { useState, useMemo } from "react";
import CsvUploader from "./csvuploader";

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  // keep only DT & ET
  const filtered = useMemo(() => {
    return rows.filter(
      (r) =>
        String(r.system).trim().toUpperCase() === "DT" ||
        String(r.system).trim().toUpperCase() === "ET"
    );
  }, [rows]);

  // search by part or assembly
  const searchedRows = useMemo(() => {
    if (!search) return filtered;
    return filtered.filter(
      (r) =>
        String(r.part || "").toLowerCase().includes(search.toLowerCase()) ||
        String(r.assembly || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [filtered, search]);

  // total cost per system
  const totalCost = (system) =>
    filtered
      .filter((r) => String(r.system).toUpperCase() === system)
      .reduce((sum, r) => sum + Number(r.part_costs_sum || 0), 0);

  // assembly-wise summary
  const assemblySummary = useMemo(() => {
    return filtered.reduce((acc, r) => {
      const key = r.assembly || "Unknown";
      acc[key] = (acc[key] || 0) + Number(r.part_costs_sum || 0);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">DT / ET Cost Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Formula Bharat Cost Breakdown 
      </p>

      {/* CSV UPLOAD */}
      <CsvUploader onDataLoaded={setRows} />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <StatCard label="Total Rows" value={rows.length} />
        <StatCard label="DT + ET Rows" value={filtered.length} />
        <StatCard label="DT Total Cost" value={`₹ ${totalCost("DT").toFixed(2)}`} />
        <StatCard label="ET Total Cost" value={`₹ ${totalCost("ET").toFixed(2)}`} />
      </div>

      {/* SEARCH */}
      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Parts List</h2>
        <input
          type="text"
          placeholder="Search by part or assembly..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-72"
        />
      </div>

      {/* TABLE */}
      <div className="mt-4 overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {[
                "System",
                "Assembly",
                "Part",
                "Make/Buy",
                "Quantity",
                "Part Cost",
                "Total Cost",
              ].map((h) => (
                <th key={h} className="border p-3 text-left text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {searchedRows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2">{r.system}</td>
                <td className="border p-2">{r.assembly}</td>
                <td className="border p-2">{r.part}</td>
                <td className="border p-2">{r.makebuy}</td>
                <td className="border p-2">{r.part_quantity}</td>
                <td className="border p-2">
                  ₹ {Number(r.part_costs || 0).toFixed(2)}
                </td>
                <td className="border p-2 font-medium">
                  ₹ {Number(r.part_costs_sum || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ASSEMBLY SUMMARY */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Cost by Assembly</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(assemblySummary).map(([a, cost]) => (
            <div
              key={a}
              className="rounded-lg border bg-gray-50 p-4 shadow-sm"
            >
              <p className="font-medium">{a}</p>
              <p className="text-gray-600 mt-1">
                ₹ {Number(cost).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* SMALL COMPONENT */
function StatCard({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
