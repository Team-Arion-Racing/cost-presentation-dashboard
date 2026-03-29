"use client";
import React, { useEffect, useState } from 'react';
// Using Absolute Imports as requested
import SystemTable, { PartData } from '@components/ui/SystemTable';
import { parseCSV } from '@utils/csvParser';

const FrameSystem = () => {
  const [data, setData] = useState<PartData[]>([]);

  useEffect(() => {
    // 1. Fetch the raw data using the generic parser
    parseCSV('/bom_data.csv').then((allRows) => {
      
      // 2. Logic: Filter only for 'FR' system
      const frParts = allRows
        .filter((row: any) => row.system === 'FR')
        .map((row: any) => ({
          // 3. Logic: Select specific columns of interest
          id: row.id,
          system: row.system,
          name: row.name,
          qty: parseInt(row.qty || '0'),
          type: row.type as "Make" | "Buy"
        }));
        
      setData(frParts);
    });
  }, []);

  if (data.length === 0) return <div className="p-4 text-slate-500">Loading Frame Data...</div>;

  return <SystemTable title="Frame & Body" systemCode="FR" parts={data} />;
};

export default FrameSystem;