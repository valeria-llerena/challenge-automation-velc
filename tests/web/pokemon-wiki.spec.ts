// tests/pokemon-wiki.spec.ts
import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../pages/WikipediaPage';
import { logSecretHash } from '../fixtures/secret.fixture';
import { getPokemonData } from '../../data/readers/data-reader-web';
import fs from 'fs';
import path from 'path';

const pokemons = getPokemonData();

for (const name of pokemons) {
    // Definimos la prueba iterativa
    test(`Validar Wikipedia Pokémon ${name}`, async ({ page }) => {

        const wiki = new WikipediaPage(page);
        
        // Formatear el nombre para la URL de Wikipedia
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();


        await test.step(`Dado que se navega a la página de Wikipedia del Pokemon ${capitalizedName}`, async () => {
            logSecretHash();
            console.log(`Navegando a: ${capitalizedName}`);
            await wiki.goToPokemon(capitalizedName);
        });

        await test.step('Y el título de la página coincide con el nombre del Pokemon y el autor se valida', async () => {
            const title = await wiki.getTitleText();
            const artist = await wiki.getArtistName();
            expect(title).toBe(capitalizedName);
            console.log(`Título verificado: ${title}`);
            console.log(`Autor del dibujo: ${artist}`);
        });

        let downloadedPath: string;
        await test.step('Cuando se descarga la imagen del pokemon', async () => {
            console.log('Descargando imagen...');
            downloadedPath = await wiki.downloadImage(name);
            expect(fs.existsSync(downloadedPath)).toBe(true);
            console.log(` Imagen descargada en: ${downloadedPath}`);
        });

        await test.step('Entonces la imagen descargada tiene una extensión válida y es menor a 500KB', async () => {
            const stats = fs.statSync(downloadedPath);
            const ext = path.extname(downloadedPath).toLowerCase();
          
            expect(['.jpg', '.jpeg', '.png', '.svg']).toContain(ext);
            
            expect(stats.size).toBeLessThan(500_000); 
            
            console.log(`Imagen: extensión ${ext}, tamaño ${stats.size} bytes`);
        });

        console.log(`\nHora finalización del test: ${name} (${new Date().toLocaleString()})\n`);
    });
}