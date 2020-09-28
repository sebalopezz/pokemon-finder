const apiAdapter = require('./apiAdapter')
const BASE_URL = 'https://pokeapi.co/api/v2'
const pokeapi = apiAdapter(BASE_URL)

module.exports = pokeapi