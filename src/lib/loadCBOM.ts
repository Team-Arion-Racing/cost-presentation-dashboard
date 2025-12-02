"use client";

import Papa from "papaparse";

export type CbomRow = {
  SystemCode: string;
  SystemName: string;
  ItemName: string;
  MakeOrBuy: string;
  Description: string;
  Quantity: string;
  PartNumber: string;
  UnitCostEUR: string;
  TotalCostEUR: string;
};

export async function loadCbom(): Promise<CbomRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CbomRow>("/data/cbom.csv", {
      download: true,
      header: true,
      dynamicTyping: false,
      complete: (results) => {
        const cleaned = results.data.filter(
          (row) => Object.values(row).some((v) => v !== "" && v != null)
        );
        resolve(cleaned);
      },
      error: (err) => reject(err),
    });
  });
}

