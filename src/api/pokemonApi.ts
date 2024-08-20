import axios from 'axios';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonDetails } from '../interfaces/pokemonDetail.interface';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllPokemonList = async (): Promise<Pokemon[]> => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=40`);
  return response.data.results;
};
export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
export const fetchPokemonListWithPagination = async (page: number): Promise<Pokemon[]> => {
  const limit = 20;
  const offset = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
};