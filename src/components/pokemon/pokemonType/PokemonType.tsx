import React from 'react';
import { IPokemonType } from '../../../interfaces/pokemon.interface';
import './PokemonType.css';

interface PokemonTypeProps {
  pokemonTypes: IPokemonType[];
}

const PokemonType: React.FC<PokemonTypeProps> = ({ pokemonTypes }) => {
  return (
    <div className="pokemon-types">
      {pokemonTypes.map((type: IPokemonType) => (
        <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
          <img
            loading="lazy"
            width="18"
            src={`/icons/${type.type.name}.svg`}
            alt={type.type.name}
            className='type-icon'
          />
          {type.type.name}
        </span>
      ))}
    </div>
  );
};

export default PokemonType;
