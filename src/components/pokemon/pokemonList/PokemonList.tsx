import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchPokemonListWithPagination } from '../../../api/pokemonApi'; 
import { IPokemon } from '../../../interfaces/pokemon.interface';
import PokemonCard from '../pokemonCard/PokemonCard';
import './PokemonList.css';

const PokemonList: React.FC = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

  return (
    <div className="pokemon-list">
      {data?.pages.flat().map((pokemon: IPokemon) => (
        <div className='test'>
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        </div>
        
      ))}
    </div>
  );
};

export default PokemonList;
