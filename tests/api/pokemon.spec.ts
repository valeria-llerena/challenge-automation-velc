// tests/api/pokemon.spec.ts
import { test, expect, APIRequestContext } from '@playwright/test';
import { PokemonApi } from '../../api/PokemonApi';
import { pokemonDataFactory } from '../../data/factories/pokemon.factory';
import { logSecretHash } from '../fixtures/secret.fixture';

const testData = pokemonDataFactory();

for (const data of testData) {
    test(`Validar Pokémon ${data.name} (ID: ${data.id})`, async ({ request }) => {

        // Declaración de variables
        let startTime= Date.now();
        let api: PokemonApi;
        let idOrName: string;

        await test.step(`Dado que se tiene la clave correcta y la API se instancia para ID ${data.id}`, async () => {
            logSecretHash();

            startTime = Date.now();
            api = new PokemonApi(request as APIRequestContext);
            idOrName = String(data.id).trim(); 
            
            console.log(`Consulta para Pokémon: ${data.name}`);
        });

        const response = await test.step(`Cuando se ejecuta la consulta para el pokémon ${data.name}`, async () => {
            return api.getPokemon(idOrName);
        });
        
        const duration = Date.now() - startTime;
        

        const body = await test.step('Entonces el status code es 200', async () => {
            
            if (response.status() !== 200) {
                const text = await response.text();
                throw new Error(`Error en la API: status ${response.status()}. RAW: ${text}`);
            }
            
            expect(response.status()).toBe(200);

            return response.json();
        });


        await test.step('Y el tiempo de respuesta es menor a 10s', async () => {
            expect(duration, `El tiempo de respuesta excedió el límite. Duración: ${duration}ms`).toBeLessThan(10000);
            console.log(`Tiempo de respuesta: ${duration}ms`);
        });
        

        await test.step(`Y el ID del Pokémon ${data.name} coincide con el esperado`, async () => { 
            expect(body.id).toBe(Number(idOrName));
            console.log(`ID : ${body.id}`);
        });
        

        await test.step(`Y las habilidades son las correspondientes al Pokemon ${data.name}`, async () => { 
            const apiAbilities = body.abilities
                .map((item: any) => item.ability.name)
                .sort(); 

            const expectedAbilities = data.abilities.sort();
            
            // Assertion habilidades
            expect(apiAbilities).toEqual(expectedAbilities);
            console.log(`Habilidades: ${apiAbilities.join(', ')}`);
        });


        console.log(`Hora finalización del Test: ${data.name} (${new Date().toLocaleString()})`);
    });
}