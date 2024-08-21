import React from 'react';
import { IPokemonCard } from '../../../interfaces/pokemonCard.interface';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: IPokemonCard;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const imageUrl = pokemon.sprites.other.home.front_default || 'fallback-image-url';

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
