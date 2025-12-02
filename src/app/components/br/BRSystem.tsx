"use client";

import { useEffect, useState } from "react";
import { loadCbom, CbomRow } from "../../lib/loadCBOM";
import Card from "../ui/Card";
import Table from "../ui/Table";
import Chart from "../ui/Chart";

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

export default function BRSystem() {
  const [rows, setRows] = useState<CbomRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCbom()
      .then((data) => {
        const brRows = data.filter((row) => row.SystemCode === "BR");
        setRows(brRows);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Brake System data…</div>;
  if (!rows.length) return <div>No BR rows found in cbom.csv.</div>;

  const totalCost = rows.reduce(
    (sum, row) => sum + parseNumber(row.TotalCostEUR),
    0
  );
  const totalQty = rows.reduce(
    (sum, row) => sum + Number(row.Quantity || "0"),
    0
  );
  const assemblies = new Set(rows.map((r) => r.SystemName)).size;

  const top5 = rows.slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Brake System – Cost Overview</h2>

      <div className="grid grid-cols-3 gap-4">
        <Card title="BR items" value={rows.length} />
        <Card title="Unique assemblies" value={assemblies} />
        <Card title="Total quantity" value={totalQty} />
      </div>

      <Chart
        title="BR – first 5 items (qty)"
        points={top5.map((row) => ({
          label: row.ItemName,
          value: Number(row.Quantity || "0"),
        }))}
      />

      <Table
        title="BR BOM (first 15 rows)"
        columns={[
          { key: "SystemName", header: "Assembly" },
          { key: "ItemName", header: "Item" },
          { key: "Quantity", header: "Qty" },
          { key: "PartNumber", header: "Part No." },
        ]}
        data={rows.slice(0, 15)}
      />
    </div>
  );
}


