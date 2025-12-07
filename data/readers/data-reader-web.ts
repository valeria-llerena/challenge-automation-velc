import xlsx from 'xlsx';
import path from 'path';

export function getPokemonData(): string[] {
  const EXCEL_PATH = path.join(process.cwd(), 'Datos-pruebas-web.xlsx');
  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: any[] = xlsx.utils.sheet_to_json(sheet);

  return data.map(row => row.name); // solo nombres
}
