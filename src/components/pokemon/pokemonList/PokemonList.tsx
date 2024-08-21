import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchPokemonListWithPagination, fetchPokemonDetails } from '../../../api/pokemonApi'; 
import { IPokemon } from '../../../interfaces/pokemon.interface';
import { IPokemonCard } from '../../../interfaces/pokemonCard.interface';
import PokemonCard from '../pokemonCard/PokemonCard';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const [detailedPokemonList, setDetailedPokemonList] = useState<IPokemonCard[]>([]);

  const {
    data,
    fetchNextPage, 
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery(
    'pokemonList',
    ({ pageParam = 1 }) => fetchPokemonListWithPagination(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const fetchDetailedPokemon = async () => {
      if (data) {
        const allPokemon = data.pages.flat();
        const detailedPokemonPromises = allPokemon.map((pokemon: IPokemon) =>
          fetchPokemonDetails(pokemon.name)
        );
        const detailedPokemon = await Promise.all(detailedPokemonPromises);
        setDetailedPokemonList(detailedPokemon);
      }
    };

    fetchDetailedPokemon();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

  return (
    <div className="pokemon-list">
      {detailedPokemonList.map((pokemon: IPokemonCard) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      {isFetchingNextPage && <div>Loading more Pokemon...</div>}
      {!hasNextPage && <div>No more Pokemon to load.</div>}
    </div>
  );
};

export default PokemonList;
