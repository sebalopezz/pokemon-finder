import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState(null)
    const value = { pokemons, setPokemons}

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;