import React, { useEffect, useState } from 'react';
import { IPokemonCard } from '../interfaces/pokemonCard.interface';
import { fetchPokemonDetails } from '../api/pokemonApi';
import { useParams } from 'react-router-dom';

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<IPokemonCard | null>(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      if (name) {
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
      }
    };
    loadPokemonDetails();
  }, [name]);

  return (
    <div>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
