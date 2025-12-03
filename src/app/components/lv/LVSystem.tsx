"use client";

import { useEffect, useState } from "react";
import { CbomRow, loadCbom } from "@lib/loadCBOM";

function getQty(row: CbomRow): number {
  return Number(row.Quantity) || 0;
}

export default function LVSystem() {
  const [rows, setRows] = useState<CbomRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCbom()
      .then((data) => {
        const lvRows = data.filter((row) => row.SystemCode === "LV");
        setRows(lvRows);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-200">Loading LV data…</div>;
  if (!rows.length) return <div className="text-slate-200">No LV rows found in cbom.csv.</div>;

  const totalQty = rows.reduce((sum, r) => sum + getQty(r), 0);
  const makeQty = rows
    .filter((r) => r.MakeOrBuy === "Make")
    .reduce((sum, r) => sum + getQty(r), 0);
  const buyQty = rows
    .filter((r) => r.MakeOrBuy === "Buy")
    .reduce((sum, r) => sum + getQty(r), 0);

  return (
    <section className="rounded-2xl bg-slate-900 text-slate-50 p-6 space-y-4 shadow-lg shadow-slate-950/40">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-xs font-semibold tracking-wide">
            LV
          </div>
          <div>
            <h2 className="text-lg font-semibold">LV System</h2>
            <p className="text-xs text-slate-400">Assembly breakdown</p>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-6 text-right text-xs uppercase tracking-wide text-slate-400">
          <div>
            <div>TOTAL QTY</div>
            <div className="text-xl font-semibold text-slate-50">
              {totalQty}
            </div>
          </div>
          <div>
            <div>MAKE</div>
            <div className="text-xl font-semibold text-emerald-300">
              {makeQty}
            </div>
          </div>
          <div>
            <div>BUY</div>
            <div className="text-xl font-semibold text-sky-300">
              {buyQty}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-2 text-left">Part ID</th>
              <th className="px-4 py-2 text-left">Component name</th>
              <th className="px-4 py-2 text-center">Qty</th>
              <th className="px-4 py-2 text-center">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 20).map((row) => (
              <tr
                key={row.PartNumber}
                className="border-t border-slate-800/80 hover:bg-slate-900/70"
              >
                <td className="px-4 py-2 text-xs font-mono text-slate-400">
                  {row.PartNumber}
                </td>
                <td className="px-4 py-2">
                  {row.ItemName || row.Description || "-"}
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-0.5 text-xs text-slate-100">
                    x{getQty(row)}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${
                      row.MakeOrBuy === "Make"
                        ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                        : "border-sky-400/40 bg-sky-500/15 text-sky-200"
                    }`}
                  >
                    {(row.MakeOrBuy || "N/A").toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}









