"use client";
import React, { useEffect, useState } from 'react';
import SystemTable, { PartData } from '../ui/SystemTable';
import { parseCSV } from '../../utils/csvParser';

const FrameSystem = () => {
  const [data, setData] = useState<PartData[]>([]);

  useEffect(() => {
    parseCSV().then((allParts) => {
      const frParts = allParts.filter(part => part.system === 'FR');
      setData(frParts);
    });
  }, []);

  if (data.length === 0) return <div className="p-4 text-slate-500">Loading Frame Data...</div>;

  return <SystemTable title="Frame & Body" systemCode="FR" parts={data} />;
};

export default FrameSystem;