import React from 'react';
import { PokemonDetails } from '../../../interfaces/pokemonDetail.interface';

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const imageUrl = pokemon.sprites?.front_default || 'fallback-image-url';

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
