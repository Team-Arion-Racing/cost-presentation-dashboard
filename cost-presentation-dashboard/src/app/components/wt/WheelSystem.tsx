"use client";
import React, { useEffect, useState } from 'react';
import SystemTable, { PartData } from '../ui/SystemTable';
import { parseCSV } from '../../utils/csvParser';

const WheelSystem = () => {
  const [data, setData] = useState<PartData[]>([]);

  useEffect(() => {
    parseCSV().then((allParts) => {
      const wtParts = allParts.filter(part => part.system === 'WT');
      setData(wtParts);
    });
  }, []);

  if (data.length === 0) return <div className="p-4 text-slate-500">Loading Wheel Data...</div>;

  return <SystemTable title="Wheels & Tires" systemCode="WT" parts={data} />;
};

export default WheelSystem;