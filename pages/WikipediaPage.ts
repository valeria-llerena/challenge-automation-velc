// pages/WikipediaPage.ts
import { Page, Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class WikipediaPage {
  readonly page: Page;
  readonly title: Locator;
  readonly image: Locator;
  readonly artistLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('#firstHeading');
    this.image = page.locator('.infobox img');
    this.artistLink = page.locator('.infobox-caption a').first();
  }

  async goToPokemon(pokemonName: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
  }

  async getTitleText(): Promise<string> {
    return (await this.title.textContent())?.trim()!;
  }
  
  async getArtistName(): Promise<string> {
    const artistName = await this.artistLink.textContent();
    if (!artistName) {
        const titleAttribute = await this.artistLink.getAttribute('title');
        if (titleAttribute) return titleAttribute.trim();
        
        return 'Artista no encontrado'; 
    }
    return artistName.trim();
  }
  async getImageUrl(): Promise<string> {
    return (await this.image.getAttribute('src'))!;
  }
  async downloadImage(pokemonName: string) {
    const imagesDir = path.join(process.cwd(), 'images');
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    // Clic en la imagen del infobox (abre el Media Viewer)
    await this.image.click();

    const closeButtonLocator = this.page.getByRole('button', { name: /Close|Cerrar/i });
    await closeButtonLocator.waitFor({ state: 'visible', timeout: 8000 }); 
    
    // Clic en el PRIMER botón “Download this file” (Esto abre el modal de descarga)
    const initialDownloadButton = this.page.getByRole('button', { name: 'Download this file' });
    await initialDownloadButton.click(); 
    
    // 4Esperar y localizar el SEGUNDO enlace de descarga (el que tiene el href directo)
    // Usamos el selector que identificaste para el enlace final en el modal:
    const directDownloadLink = this.page.locator('a.cdx-button--action-progressive[href*="download"]');
    
    await directDownloadLink.waitFor({ state: 'visible', timeout: 8000 });
    
    let imgUrl = await directDownloadLink.getAttribute('href'); 
    if (!imgUrl) throw new Error('No se encontró el enlace de descarga directa en el modal.');
    
    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
    

    const response = await this.page.context().request.get(imgUrl);
    
    if (!response.ok()) {
        throw new Error(`Fallo en la descarga de la URL: ${imgUrl}. Estado: ${response.status()}`);
    }
    
    const buffer = Buffer.from(await response.body());

    // Guardar el archivo localmente
    const ext = path.extname(imgUrl.split('?')[0]);
    const fileName = `${pokemonName}${ext}`;
    const filePath = path.join(imagesDir, fileName);

    fs.writeFileSync(filePath, buffer);

    console.log(`✅ Imagen original descargada correctamente: ${filePath}`);
    return filePath;
}
}