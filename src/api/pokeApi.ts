import axios from 'axios';
import type { IPokemonDetails, IPokemonListResponse, IPokemonTypeRef, PokemonElementType } from '../types/pokemon';

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

export const getMoveType = async (url: string): Promise<PokemonElementType | null> => {
	const cacheKey = `move_type_${url}`;
	const cached = sessionStorage.getItem(cacheKey);

	if (cached) return cached as PokemonElementType;

	try {
		const { data } = await axios.get<IPokemonTypeRef>(url);
		const typeName = data.type.name;

		sessionStorage.setItem(cacheKey, typeName);
		return typeName as PokemonElementType;
	} catch (error) {
		console.error(`Error obteniendo tipo del movimiento: ${url}`, error);
		return null;
	}
};

export default pokeApi;
