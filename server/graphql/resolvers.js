const pokeapi = require('../pokeapi')

const resolvers = {
  Query: {
    pokemons: (parent,args) => {
      const query = args.search || ""
      const pokemons = []
      const promises = []
      if (query) {
        return pokeapi.get('/pokemon?limit=2000')
        .then(resp => {
          const matchingPokemons = resp.data.results.filter(pokemon => pokemon.name.includes(query))
          matchingPokemons.forEach(pokemon => {
            promises.push(
              pokeapi.get(pokemon.url)
              .then(response => pokemons.push(response.data))
              .catch(error => console.log("GET pokemon failed", error))
            )
          })
          return Promise.all(promises)
          .then(() => { return pokemons })
          .catch(error => console.log("Promise.all failed", error))
        })
        .catch(error => console.log("GET pokemon list failed", error))
      } else {
        return []
      }
    }
  },
  Pokemon: {
    pictureURL: (parent,args) => {
      return parent.sprites.front_default
    }
  }
}

module.exports = resolvers