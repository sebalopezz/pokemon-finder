import React from "react";
import Header from '../../components/Header'
import SearchBar from "../../components/SearchBar";
import PokemonList from '../../components/PokemonList'
import Footer from '../../components/Footer'
import './styles.scss';

const Home = () => {
  return (
    <div className="home">
        <Header />
        <SearchBar />
        <PokemonList />
        <Footer />
    </div>
  );
};

export default Home;