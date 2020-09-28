import React from 'react'
import pokeball from '../../assets/pokeball.png'

const PokemonItem = ({pokemon: {name, pictureURL}}) => {
    return (
        <div className="pokemon-item">
            <img src={(pictureURL) ? pictureURL : pokeball} alt="Pokemon" className="pokemon-img" />
            <h2>{name}</h2>
        </div>
    )
}

export default PokemonItem