"use client";

import React, { useState } from "react";
import CsvUploader from "./csvuploader";

export default function Dashboard() {
  const [rows, setRows] = useState<any[]>([]);

  
  const filtered = rows.filter(
    (r) =>
      String(r.System).trim().toUpperCase() === "DT" ||
      String(r.System).trim().toUpperCase() === "ET"
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">DT / ET Dashboard</h1>

      
      <CsvUploader onDataLoaded={(data) => setRows(data)} />

     
      <div className="mt-4">
        <p>Total entries: {rows.length}</p>
        <p>Filtered (DT + ET): {filtered.length}</p>
      </div>

      
      <div className="mt-6">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              {filtered.length > 0 &&
                Object.keys(filtered[0]).map((col) => (
                  <th key={col} className="border p-2">{col}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((v, i) => (
                  <td key={i} className="border p-2">{String(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
