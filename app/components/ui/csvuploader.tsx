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
console.log("onDataLoaded is:", onDataLoaded);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);
        onDataLoaded(results.data as Record<string, any>[]);
        //TEMP LOGGING TO VERIFY PARSING
          console.log("CSV PARSED:", results.data);
        console.log("ROWS LENGTH:", results.data.length);
        onDataLoaded(results.data as Record<string, any>[]);
      },
      completee: (results) => {
  console.log("COMPLETE FIRED");
  console.log(results.data);
  onDataLoaded(results.data);
},

    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
}
