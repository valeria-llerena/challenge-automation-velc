import { leerExcel } from "../readers/data-reader-api";
export function pokemonDataFactory() {

  const data = leerExcel(); 

   return data.map((row: any) => ({
     id: row.id,
     name: row.name,
     abilities: String(row.abilities)
      .toLowerCase() 
      .split(',') 
      .map(a => a.trim()) 
      .filter(a => a.length > 0) 
  }));
}