import * as XLSX from 'xlsx';

export function leerExcel(): any[] { 
 const workbook = XLSX.readFile('Datos-pruebas-api.xlsx');
 const sheetName = workbook.SheetNames[0];
 const sheet = workbook.Sheets[sheetName];
 return XLSX.utils.sheet_to_json(sheet);
}