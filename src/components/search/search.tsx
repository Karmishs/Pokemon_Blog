import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAllPokemonList } from '../../api/pokemonApi';
import { Pokemon } from '../../interfaces/pokemon.interface';

const PokemonSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: allPokemon = [], isLoading, isError } = useQuery('allPokemon', fetchAllPokemonList, {
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 60,
  });

  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPokemon.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonSearch;
