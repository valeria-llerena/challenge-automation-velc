// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
   reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],

  projects: [
    {
      name: 'jsonp',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com'
      },

      testMatch: '**/tests/api/posts.spec.ts', 
    },
    {
    name: 'pokemon',
    use: {
      baseURL: 'https://pokeapi.co'
    },

    testMatch: '**/tests/api/pokemon.spec.ts', 
    },
    {
      name: 'pokemon-web',
      use: { ...devices['Desktop Chrome'] , headless: false,},
      testMatch: '**/tests/web/pokemon-wiki.spec.ts', 
      
    }
  ]
});