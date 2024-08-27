import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fetchPokemonDetailsByUrl } from '../../../api/pokemonApi';
import { IPokemon, IPokemonCard } from '../../../interfaces/pokemon.interface';
import './PokemonCard.css';
import '../pokemonType/PokemonType.css';
import '../pokemonStat/PokemonStat.css';
import PokemonType from '../pokemonType/PokemonType';
import PokemonStat from '../pokemonStat/PokemonStat';
import { pokemonData } from "../../../helpers/PokemonTypes";

interface PokemonCardProps {
  pokemon: IPokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState("#fff");
  const cardRef = useRef<HTMLDivElement>(null);

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

  function getColorByType(pokemonType: string | undefined): string | null {
    const foundPokemon = pokemonData.find((pokemon) => pokemon.type === pokemonType);
    return foundPokemon ? foundPokemon.color : null;
  }

  const imageUrl = pokemonDetails?.sprites?.other?.['official-artwork']?.front_default || 'fallback-image-url';
  const Color = getColorByType(pokemonDetails?.types[0]?.type.name) ?? "#fff";
  
  useEffect(() => {
    setColor(Color);
  }, [Color]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--primary-color', color);
    }
  }, [color]);

  return (
    <motion.div 
      ref={cardRef}
      className="pokemon-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: false }}  // Hiệu ứng chỉ xảy ra một lần khi card vào view
    >
      <div className="img-div">
        <img className="pokemon-card-image" src={imageUrl} alt={pokemon.name} />
      </div>
      <div className="pokemon-info">
        <span className="pokemon-name">{pokemon.name}</span>
        <div className="pokemon-types">
          <PokemonType pokemonTypes={pokemonDetails?.types || []} />
        </div>
        <div className="pokemon-stats">
          <PokemonStat pokemonStats={pokemonDetails} />
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
