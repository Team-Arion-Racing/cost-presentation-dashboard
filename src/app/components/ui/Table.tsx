"use client";

import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T;
  header: string;
  // optional custom renderer (for inputs etc.)
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  title: string;
  columns: Column<T>[];
  data: T[];
};

export default function Table<T extends object>({
  title,
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-3 py-2 text-left font-medium"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-3 py-2">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



