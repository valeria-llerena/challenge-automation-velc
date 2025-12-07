import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { PostApi } from '../../api/PostApi';
import { logSecretHash } from '../fixtures/secret.fixture';
import { postPayloadFactory, PostPayload } from '../../data/factories/posts.factory';

test('Validar creación de varios POSTS ', async ({ request }) => {
    
    let api: PostApi; 
    let payload: PostPayload;
    let response: APIResponse;

    payload = await test.step('Dado que se tiene la clave correcta y la API se instancia', async () => {
        logSecretHash();
        
        api = new PostApi(request as APIRequestContext); 
        
        // Crear datos que se enviará
        return postPayloadFactory('Nuevo Post', 5); 
    });


    response = await test.step('Cuando se crean 5 posts', async () => {
        return api.createPost(payload); 
    });

    await test.step('Entonces se verifica el status code 201', async () => {
        expect(response.status()).toBe(201);
    });


    await test.step('Y los datos del Body y ID generado son correctos.', async () => {
        const body = await response.json();

        // Assertion de datos enviados
        expect(body.title).toBe(payload.title);
        expect(body.body).toBe(payload.body); 
        expect(body.userId).toBe(payload.userId);
        
        // Assertion del ID simulado
        expect(body.id).toBe(101); 
        
        console.log(`Post creado con ID simulado: ${body.id}`);
    });
    
    console.log(`Hora finalización del Test: ${new Date().toLocaleString()}`);
});