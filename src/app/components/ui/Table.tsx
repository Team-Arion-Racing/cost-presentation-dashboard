"use client";

import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T;
  header: string;
  // optional custom renderer
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  title?: string;
  columns: Column<T>[];
  data: T[];
};

export default function Table<T extends object>({
  title,
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="mt-4">
      {title && (
        <h3 className="mb-2 text-sm font-semibold text-slate-200">
          {title}
        </h3>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-2 text-left"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-slate-800/80 hover:bg-slate-900/70"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2"
                  >
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



