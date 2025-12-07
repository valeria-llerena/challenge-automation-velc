
# Challenge Automation

Proyecto de Automatización Web y API con Playwright + Typescript


## Autores

- [@valeria-llerena](https://www.github.com/valeria-llerena)

## Estructura del Proyecto

| Proyecto             | Tipo de Prueba                      |
| ----------------- | ------------------- | 
| jsonp | API
| pokemon |API 
| pokemon-web | WEB 

Este proyecto está organizado bajo un enfoque de API/Page Object Model combinado con el patrón Data Factory para la generación de datos de prueba dinámicos.

- api/ (PokemonApi.ts, PostApi.ts): Contiene clases que encapsulan todas las llamadas HTTP (GET, POST, etc.) a servicios externos (jsonplaceholder, pokeapi).
- data/ (factories/, readers/): Contiene lógica para generar (factories) o leer (readers) los datos de prueba (payloads, listas de Pokémon esperadas) para las pruebas de API y Web.
- tests/ (api/, web/): Contiene los archivos .spec.ts donde se define la lógica de la prueba, los pasos (test.step), y las aserciones.
- fixtures/: Contiene funciones o fixtures reusables (como logging de hashes o claves secretas) que se inyectan en las pruebas.

Se crearon 2 archivos de Excel pues en Wikipedia solo hay páginas sobre algunos Pikachus lo cual puede generar errores al momento de jecutar erar los tests. 
## Instalación

Validar que se tenga instalado Node.js

```bash
  node -v
  npm -v
```

Clonar mi proyecto

```bash
  git clone https://github.com/valeria-llerena/challenge-automation-velc.git
```

Ir al directorio del proyecto
```bash
  cd challenge-automation-velc
```

Instalar las dependencias

```bash
  npm install
  npx playwright install
```

Agregar el archivo .env con las variables de entorno:

```bash
    ENV={AMBIENTE}
    SECRET_KEY_QA={CLAVE}
    SECRET_KEY_CERT={CLAVE}
```
El ambiente solo puede ser CERT o QA, cualquier otro ambiente mostrará el error:

```bash
    Ambiente no soportado: ${env}. Configura ENV como 'QA' o 'CERT'.
```


## Tests

Para ejecutar los tests

```bash
  npx playwright test
```

Para ver el reporte ejecuta

```bash
  npx playwright show-report
```
También se puede ejecutar por proyecto: jsonp, pokemon, pokemon-web

```bash
  npx playwright test --project=jsonp
```
## Demo
Link Demo: 

## Troubleshooting

Debido a la lentitud del navegador, puede que en las pruebas web algunos test fallen en la primera ejecución, se recomienda ejecutar el comando nuevamente: 

```bash
  npx playwright test
```
O en caso persista en el archivo playwright.config.ts modificar: 

```ts
    {
      name: 'pokemon-web',
      use: { ...devices['Desktop Chrome'] , headless: false,},
      testMatch: '**/tests/web/pokemon-wiki.spec.ts', 
      
    }
```

Por: 


```ts
    {
      name: 'pokemon-web',
      use: { ...devices['Desktop Chrome'] , headless: true,},
      testMatch: '**/tests/web/pokemon-wiki.spec.ts', 
      
    }
```

Para otro tipo de errores contactarme al correo.
