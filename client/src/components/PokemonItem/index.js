import React from 'react'
import pokeball from '../../assets/pokeball.png'
import './styles.scss';

const PokemonItem = ({pokemon: {name, pictureURL}}) => {
    return (
        <div className="pokemon-item">
            <img src={(pictureURL) ? pictureURL : pokeball} alt="Pokemon" className="pokemon-img" />
            <h4 className="pokemon-name">{name.replace(/-/g, " ")}</h4>
        </div>
    )
}

export default PokemonItem