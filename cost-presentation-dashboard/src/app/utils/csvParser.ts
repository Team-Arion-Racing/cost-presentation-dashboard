import { PartData } from '../components/ui/SystemTable';

export const parseCSV = async (): Promise<PartData[]> => {
  try {
    const response = await fetch('/bom_data.csv');
    const text = await response.text();
    
    // Split by new line, skip header row
    const lines = text.split('\n').slice(1);
    
    return lines
      .filter(line => line.trim() !== '')
      .map(line => {
        const [id, system, name, qty, type] = line.split(',');
        return {
          id: id?.trim(),
          system: system?.trim(),
          name: name?.trim(),
          qty: parseInt(qty?.trim() || '0'),
          type: type?.trim() as "Make" | "Buy"
        };
      });
  } catch (error) {
    console.error("Failed to parse CSV", error);
    return [];
  }
};