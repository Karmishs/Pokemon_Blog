import React, { useEffect, useState } from 'react';
import { fetchAllPokemonList, fetchPokemonDetails } from '../../../api/pokemonApi';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { PokemonDetails } from '../../../interfaces/pokemonDetail.interface';
import PokemonCard from '../pokemonCard/PokemonCard';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchAllPokemonList();
        
        const detailedPokemonList = await Promise.all(
          data.map(async (pokemon: Pokemon) => {
            try {
              return await fetchPokemonDetails(pokemon.name);
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null; 
            }
          })
        );

        setPokemonList(detailedPokemonList.filter((pokemon): pokemon is PokemonDetails => pokemon !== null));
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };
    loadPokemon();
  }, []);


  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
