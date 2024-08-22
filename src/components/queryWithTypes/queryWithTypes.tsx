import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchAllPokemonList, fetchPokemonDetailsByUrl } from '../../api/pokemonApi';
import { IPokemonCard } from '../../interfaces/pokemonCard.interface';

const QueryWithTypes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: IPokemonCard }>({});

  const { data: allPokemon = [], isLoading, isError } = useQuery('allPokemon', fetchAllPokemonList, {
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 60,
  });

  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );  

  const displayPokemon = filteredPokemon.slice(0, 7);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        displayPokemon.map(pokemon => 
          fetchPokemonDetailsByUrl(pokemon.url).then(data => ({ name: pokemon.name, data }))
        )
      );
      setPokemonDetails(prevDetails => {
        const newDetails = { ...prevDetails };
        details.forEach(({ name, data }) => {
          newDetails[name] = data;
        });
        return newDetails;
      });
    };

    if (displayPokemon.length > 0) {
      fetchDetails();
    }
  }, [displayPokemon]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar-input"
        />
        <span className="search-bar-icon">
          <img src="search.png" alt="search-bar-icon" />
        </span>
      </div>
      {searchTerm && (
        <ul className="search-bar-results">
          {displayPokemon.length > 0 ? (
            displayPokemon.map((pokemon) => (
              <li key={pokemon.name} className="search-item">
                <img 
                  src={pokemonDetails[pokemon.name]?.sprites.other["official-artwork"].front_default} 
                  alt={pokemon.name} 
                  loading='lazy'
                />
                <h3>{pokemon.name}</h3>
              </li>
            ))
          ) : (
            <li className="search-item">Pokemon not found</li>
          )}
        </ul>
      )}
    </div>
  );  
};

export default QueryWithTypes;
