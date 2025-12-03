"use client";

import { useEffect, useState } from "react";
import { CbomRow, loadCbom } from "@/lib/loadCBOM";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import Chart from "@/app/components/ui/Chart";

type LVRow = CbomRow & {
  quantityEditable: number;
};

function parseNumber(value: string | undefined): number {
  if (!value) return 0;
  return (
    Number(
      value
        .replace(/[^\d.,-]/g, "")
        .replace(",", ".")
    ) || 0
  );
}

export default function LVSystem() {
  const [rows, setRows] = useState<LVRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCbom()
      .then((data) => {
        const lvRows: LVRow[] = data
          .filter((row) => row.SystemCode === "LV")
          .map((row) => ({
            ...row,
            quantityEditable: Number(row.Quantity) || 0,
          }));
        setRows(lvRows);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading LV System data…</div>;
  if (!rows.length) return <div>No LV rows found in cbom.csv.</div>;

  const totalCost = rows.reduce(
    (sum, row) => sum + parseNumber(row.TotalCostEUR),
    0
  );
  const partCount = rows.length;
  const totalQuantity = rows.reduce(
    (sum, row) => sum + row.quantityEditable,
    0
  );
  const top5 = rows.slice(0, 5);

  function handleQtyChange(partNumber: string, newQty: number) {
    if (Number.isNaN(newQty) || newQty < 0) newQty = 0;

    setRows((prev) =>
      prev.map((row) =>
        row.PartNumber === partNumber
          ? { ...row, quantityEditable: newQty }
          : row
      )
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">LV System – Cost Overview</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Cost" value={totalCost.toFixed(2)} unit="€" />
        <Card title="Number of LV parts" value={partCount} />
        <Card
          title="Avg Cost / Part"
          value={(totalCost / (partCount || 1)).toFixed(2)}
          unit="€"
        />
        <Card title="Total Quantity (editable)" value={totalQuantity} />
      </div>

      <Chart
        title="Quantity of first 5 LV items"
        points={top5.map((row) => ({
          label: String(row.ItemName || row.SystemName || "Item"),
          value: row.quantityEditable,
        }))}
      />

      <Table
        title="LV Items (first 20 rows)"
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
                className="w-16 rounded border px-1 py-0.5 text-sm"
                value={row.quantityEditable}
                onChange={(e) =>
                  handleQtyChange(
                    row.PartNumber,
                    Number(e.target.value)
                  )
                }
              />
            ),
          },
          { key: "TotalCostEUR", header: "Total Cost (€)" },
        ]}
        data={rows.slice(0, 20)}
      />
    </div>
  );
}





