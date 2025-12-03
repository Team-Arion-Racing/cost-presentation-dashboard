"use client";

import { useEffect, useState } from "react";
import { CbomRow, loadCbom } from "@/lib/loadCBOM";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import Chart from "@/app/components/ui/Chart";

type BRRow = CbomRow & {
  quantityEditable: number;
  unitCostEditable: number;
};

const EUR_TO_INR = 90;

function parseNumber(v: string | undefined): number {
  if (!v) return 0;
  return Number(v.replace(/[^\d.-]/g, "")) || 0;
}

export default function BRSystem() {
  const [rows, setRows] = useState<BRRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCbom()
      .then((data) => {
        const parsed: BRRow[] = data
          .filter((row) => row.SystemCode === "BR")
          .map((row) => ({
            ...row,
            quantityEditable: Number(row.Quantity) || 0,
            unitCostEditable: parseNumber(row.UnitCostEUR) * EUR_TO_INR || 0,
          }));
        setRows(parsed);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading BR data…</div>;

  const systemTotal = rows.reduce(
    (sum, row) => sum + row.quantityEditable * row.unitCostEditable,
    0
  );

  const avgCost = systemTotal / (rows.length || 1);
  const totalQuantity = rows.reduce(
    (sum, row) => sum + row.quantityEditable,
    0
  );

  const top5 = rows.slice(0, 5);

  function updateRow(partNumber: string, field: "qty" | "unit", value: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.PartNumber === partNumber
          ? {
              ...r,
              quantityEditable: field === "qty" ? value : r.quantityEditable,
              unitCostEditable: field === "unit" ? value : r.unitCostEditable,
            }
          : r
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* 🔥 FIXED HEADING */}
      <h2 className="text-xl font-semibold">Brake System</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Cost" value={systemTotal.toFixed(2)} unit="₹" />
        <Card title="Parts Count" value={rows.length} />
        <Card title="Avg Cost / Part" value={avgCost.toFixed(2)} unit="₹" />
        <Card title="Total Quantity" value={totalQuantity} />
      </div>

      <Chart
        title="Total Cost of first 5 BR items"
        points={top5.map((r) => ({
          label: r.ItemName,
          value: r.quantityEditable * r.unitCostEditable,
        }))}
      />

      <Table
        title="BR Items (Editable)"
        columns={[
          { key: "ItemName", header: "Item" },
          {
            key: "Quantity",
            header: "Qty",
            render: (row) => (
              <input
                type="number"
                min={0}
                className="w-16 border rounded px-1 py-0.5"
                value={row.quantityEditable}
                onChange={(e) =>
                  updateRow(row.PartNumber, "qty", Number(e.target.value))
                }
              />
            ),
          },
          {
            key: "UnitCostEUR",
            header: "Unit Cost (₹)",
            render: (row) => (
              <input
                type="number"
                min={0}
                className="w-24 border rounded px-1 py-0.5"
                value={row.unitCostEditable}
                onChange={(e) =>
                  updateRow(row.PartNumber, "unit", Number(e.target.value))
                }
              />
            ),
          },
          {
            key: "TotalCostEUR",
            header: "Total Cost (₹)",
            render: (row) => (
              <span>
                {(row.unitCostEditable * row.quantityEditable).toFixed(2)}
              </span>
            ),
          },
        ]}
        data={rows}
      />
    </div>
  );
}











