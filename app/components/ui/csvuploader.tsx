"use client";

import React from "react";
import Papa from "papaparse";

type CsvUploaderProps = {
  onDataLoaded: (rows: Record<string, any>[]) => void;
};

export default function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        onDataLoaded(results.data as Record<string, any>[]);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
}
