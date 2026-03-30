"use client";
import React, { useEffect, useState } from 'react';
import { parseCSV } from '@utils/csvParser';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"; // This imports the Shadcn table you just installed

type PartData = {
  id: string;
  system: string;
  name: string;
  qty: number;
  type: "Make" | "Buy";
};

const FrameSystem = () => {
  const [data, setData] = useState<PartData[]>([]);

  useEffect(() => {
    // Fetch and filter data
    parseCSV('/bom_data.csv').then((allRows) => {
      const frParts = allRows
        .filter((row: any) => row.system === 'FR')
        .map((row: any) => ({
          id: row.id,
          system: row.system,
          name: row.name,
          qty: parseInt(row.qty || '0'),
          type: row.type as "Make" | "Buy"
        }));
      setData(frParts);
    });
  }, []);

  if (data.length === 0) return <div className="p-4">Loading Frame Data...</div>;

  return (
    <div className="w-full border rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Frame System (FR)</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Part ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((part) => (
            <TableRow key={part.id}>
              <TableCell className="font-medium">{part.id}</TableCell>
              <TableCell>{part.name}</TableCell>
              <TableCell>{part.qty}</TableCell>
              <TableCell>{part.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FrameSystem;