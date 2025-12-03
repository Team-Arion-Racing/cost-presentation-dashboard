"use client";
import React, { useEffect, useState } from 'react';
import SystemTable, { PartData } from '../ui/SystemTable';
import { parseCSV } from '../../utils/csvParser';

const MiscSystem = () => {
  const [data, setData] = useState<PartData[]>([]);

  useEffect(() => {
    parseCSV().then((allParts) => {
      const msParts = allParts.filter(part => part.system === 'MS');
      setData(msParts);
    });
  }, []);

  if (data.length === 0) return <div className="p-4 text-slate-500">Loading Misc Data...</div>;

  return <SystemTable title="Misc & Safety" systemCode="MS" parts={data} />;
};

export default MiscSystem;