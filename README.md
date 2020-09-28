# Pokemon Finder

Aplicación web para buscar pokemones consumiendo la [PokeAPI](https://pokeapi.co)

Stack: React, Apollo, Node.js, Express, GraphQL.

## Instalación

```bash
    # Install dependencies (server & client)
    npm install
    cd client && npm install
    
    # Run server & client (:3000 & :5000)
    npm run dev
    
    # Server only (:5000)
    npm run server
    
    # Client only (:3000)
    npm run client
    
    # Run client tests (:3000)
    cd client && npm test
```

## Arquitectura

![Alt text](https://firebasestorage.googleapis.com/v0/b/comidapp-caf14.appspot.com/o/extra%2Fpokemon-finder_1000x1000.png?alt=media&token=d5e8be2e-f8d8-44fb-914e-a69c6da2259c?raw=true "Title")

## Docs
### Estados
Utilicé Context para administrar el estado de la aplicación para generar un código más limpio y evitar pasar gran cantidad de propiedades entre componentes.

### GraphQL
Utlicé GraphQL en el backend con Node.js para proveer al cliente de un único endpoint a la hora de consultar los pokemons de la PokeAPI y simplificar así, las llamadas que se deben realizar desde el cliente.

En el cliente utilicé Apollo para consumir los datos de GraphQL en el servidor.

### Testing
Contemplé los siguientes casos de prueba del lado del cliente:
1. Header. El logo en el Header se renderiza correctamente.
2. SearchBar. El SearchBar se renderiza correctamente.
3. SearchBar. El botón está activo si el input no está vacio y no está cargando.
4. SearchBar. El botón está inactivo si el input está vacio y no está cargando.
5. SearchBar. El SearchBar debe esperar a ejecutar la query (useLazyQuery) manualmente cuando se presiona enter o se hace clic en buscar (y no al renderizar el componente).
6. SearchBar. El SearchBar debe realizar la búsqueda utilizando el input que ingresó el usuario y "filtrar" correctamente los resultados.
