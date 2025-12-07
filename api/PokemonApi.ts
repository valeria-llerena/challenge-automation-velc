import { APIRequestContext, APIResponse } from '@playwright/test';

export class PokemonApi {

  constructor(private request: APIRequestContext) {}
  async getPokemon(idOrName: string | number): Promise<APIResponse> {
    return this.request.get(`/api/v2/pokemon/${idOrName}`);
 }
 
 async getAbilities(idOrName: string | number): Promise<string[]> {
    const response = await this.getPokemon(idOrName);
    if (response.status() !== 200) {
        throw new Error(`Error al obtener habilidades: status ${response.status()}`);
    }
    const body = await response.json();

    return body.abilities.map((item: any) => item.ability.name);
 }
}