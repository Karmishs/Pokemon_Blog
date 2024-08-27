import axios from 'axios';
import { IPokemon } from '../interfaces/pokemon.interface';
import { IPokemonCard } from '../interfaces/pokemon.interface';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllPokemonList = async (): Promise<IPokemon[]> => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=10000`);
  return response.data.results;
};
export const fetchPokemonDetails = async (name: string): Promise<IPokemonCard> => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
export const fetchPokemonDetailsByUrl = async (url: string): Promise<IPokemonCard> => {
  const response = await axios.get(url);
  return response.data;
}
export const fetchPokemonListWithPagination = async (page: number): Promise<IPokemon[]> => {
  const limit = 9;
  const offset = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
};