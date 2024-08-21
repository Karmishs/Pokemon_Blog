import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PokemonDetail from '../pages/PokemonPage';
import PokemonList from '../components/pokemon/pokemonList/PokemonList';
import Header from '../components/layout/Header';
import SearchWithName from '../components/searchWithName/SearchWithName';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/pokemon"
              element={
                <>
                  <SearchWithName />
                  <PokemonList />
                </>
              }
            />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
