import React, { useState, useContext } from 'react'
import { useLazyQuery, gql } from '@apollo/client';
import { PokemonContext } from '../../context/Pokemon';

const GET_POKEMONS = gql`
    query PokemonsQuery($search: String!) {
        pokemons(search: $search) {
            name
            pictureURL
        }
    }
`

const SearchBar = props => {

    const [query, setQuery] = useState("");
    const { setPokemons } = useContext(PokemonContext);

    const [getPokemons, { loading, data }] = useLazyQuery(GET_POKEMONS, {
        onCompleted: () => setPokemons(data.pokemons)
    })

    const onFormSubmit = (event) => {
        if (query.length && !loading) {
            getPokemons({variables: { search: query.toLowerCase()}})
        }
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={onFormSubmit} className="search-bar">
                <input type="text" placeholder="Ingrese el nombre a buscar" onChange={(e) => setQuery(e.target.value) }/>
                <button onClick={onFormSubmit} className={((query.length && !loading) ? 'btn-active' : 'btn-inactive')}> {loading ? 'Cargando...' : 'Buscar'} </button>
            </form>
        </div>
    )
}

export default SearchBar