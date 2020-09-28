import React, { useContext } from 'react';
import { PokemonContext } from '../../context/Pokemon';
import PokemonItem from '../PokemonItem'

const Pokemons = props => {
    const { pokemons } = useContext(PokemonContext)

    return (
        <div className="pokemon-list">
            <h3>{(pokemons) ? `Resultados (${pokemons.length})` : ""}</h3>
            {pokemons && pokemons.map(pokemon => (
                <PokemonItem key={pokemon.name} pokemon={pokemon}/>
            ))}
        </div>
    )
}

export default Pokemons