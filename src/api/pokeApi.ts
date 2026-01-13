import axios from 'axios';
import type { IPokemonDetails, IPokemonListResponse } from '../types/pokemon';

export const pokeApi = axios.create({
	baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async (limit: number, offset: number) => {
	const { data } = await pokeApi.get<IPokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
	return data;
};

export const getPokemonDetails = async (idOrName: number | string) => {
	const { data } = await pokeApi.get<IPokemonDetails>(`/pokemon/${idOrName}`);
	return { data };
};

export default pokeApi;
