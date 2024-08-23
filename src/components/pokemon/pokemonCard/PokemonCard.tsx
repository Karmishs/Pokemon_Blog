import React, { useEffect, useState } from 'react';
import { fetchPokemonDetailsByUrl } from '../../../api/pokemonApi';
import { IPokemon, IPokemonCard } from '../../../interfaces/pokemon.interface';
import './PokemonCard.css';
import '../pokemonType/PokemonType.css';
import PokemonType from '../pokemonType/PokemonType';

interface PokemonCardProps {
  pokemon: IPokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchPokemonDetailsByUrl(pokemon.url);
        setPokemonDetails(details);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}:`, error);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon.url, pokemon.name]);

  const imageUrl = pokemonDetails?.sprites?.other?.['official-artwork']?.front_default || 'fallback-image-url';

  return (
    <div className="pokemon-card">
      <div className="img-div">
        <img className= "pokemon-card-image" src={imageUrl} alt={pokemon.name} />
      </div>
      <div className="pokemon-info">
        <span className="pokemon-name">{pokemon.name}</span>
        <div className="pokemon-types">
          <PokemonType pokemonTypes={pokemonDetails?.types || []} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
