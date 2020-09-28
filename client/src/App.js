import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import PokemonProvider from './context/Pokemon';
import Home from './pages/Home';
import './styles/styles.scss';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <PokemonProvider>
        <Home/>
      </PokemonProvider>
    </ApolloProvider>
  );
}

export default App;
