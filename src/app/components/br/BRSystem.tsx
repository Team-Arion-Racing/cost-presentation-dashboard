"use client";

import { useEffect, useState } from "react";
import { CbomRow, loadCbom } from "@/lib/loadCBOM";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import Chart from "@/app/components/ui/Chart";

type BRRow = CbomRow & {
  quantityEditable: number;
  costEditable: number;
};

function parseNumber(v: string | undefined): number {
  if (!v) return 0;
  return (
    Number(
      v.replace(/[^\d.,-]/g, "").replace(",", ".")
    ) || 0
  );
}

export default function BRSystem() {
  const [rows, setRows] = useState<BRRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCbom().then((data) => {
      const mapped = data
        .filter((row) => row.SystemCode === "BR")
        .map((row) => ({
          ...row,
          quantityEditable: Number(row.Quantity) || 0,
          costEditable: parseNumber(row.TotalCostEUR),
        }));

      setRows(mapped);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading BR System…</div>;
  if (!rows.length) return <div>No BR rows found.</div>;

  const totalCost = rows.reduce((s, r) => s + r.costEditable, 0);
  const partCount = rows.length;
  const avgCost = totalCost / (partCount || 1);
  const totalQuantity = rows.reduce((s, r) => s + r.quantityEditable, 0);

  const top5 = rows.slice(0, 5);

  function updateQty(part: string, qty: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.PartNumber === part
          ? { ...r, quantityEditable: qty < 0 ? 0 : qty }
          : r
      )
    );
  }

  function updateCost(part: string, cost: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.PartNumber === part
          ? { ...r, costEditable: cost < 0 ? 0 : cost }
          : r
      )
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Brake System – Cost Overview</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Cost" value={totalCost.toFixed(2)} unit="€" />
        <Card title="Number of BR parts" value={partCount} />
        <Card title="Avg Cost / Part" value={avgCost.toFixed(2)} unit="€" />
        <Card title="Total Quantity" value={totalQuantity} />
      </div>

      <Chart
        title="Cost of first 5 BR items"
        points={top5.map((row) => ({
          label: row.ItemName,
          value: row.costEditable,
        }))}
      />

      <Table
        title="BR Items (first 20 rows)"
        columns={[
          { key: "SystemName", header: "System" },
          { key: "ItemName", header: "Item" },
          {
            key: "Quantity",
            header: "Qty",
            render: (row) => (
              <input
                type="number"
                min={0}
                value={row.quantityEditable}
                className="w-16 rounded border px-1 py-0.5"
                onChange={(e) =>
                  updateQty(row.PartNumber, Number(e.target.value))
                }
              />
            ),
          },
          {
            key: "TotalCostEUR",
            header: "Total Cost (€)",
            render: (row) => (
              <input
                type="number"
                min={0}
                step="0.01"
                value={row.costEditable}
                className="w-24 rounded border px-1 py-0.5"
                onChange={(e) =>
                  updateCost(row.PartNumber, Number(e.target.value))
                }
              />
            ),
          },
        ]}
        data={rows.slice(0, 20)}
      />
    </div>
  );
}






