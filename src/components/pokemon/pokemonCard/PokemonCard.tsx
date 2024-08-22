import React, { useEffect, useState } from 'react';
import { fetchPokemonDetailsByUrl } from '../../../api/pokemonApi';
import { IPokemon } from '../../../interfaces/pokemon.interface';
import { IPokemonCard } from '../../../interfaces/pokemonCard.interface';
import './PokemonCard.css';

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
      <div className='img-div'>
        <img src={imageUrl} alt={pokemon.name} />
      </div>
      <div className='text'>
        <span>{pokemon.name}</span>
      </div>
    

        
    </div>
  );
};

export default PokemonCard;
