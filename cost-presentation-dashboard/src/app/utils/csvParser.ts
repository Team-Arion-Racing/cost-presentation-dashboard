export const parseCSV = async (filePath: string): Promise<any[]> => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    
    // Split text into lines
    const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    
    // Extract headers (first row) -> id, system, name, qty, type
    const headers = rows[0].split(',').map(h => h.trim());
    
    // Map the rest of the rows to generic objects
    return rows.slice(1).map(row => {
      const values = row.split(',');
      const rowData: any = {};
      
      headers.forEach((header, index) => {
        // Create key-value pair: rowData["system"] = "FR"
        rowData[header] = values[index]?.trim();
      });
      
      return rowData;
    });
  } catch (error) {
    console.error("Failed to parse CSV", error);
    return [];
  }
};