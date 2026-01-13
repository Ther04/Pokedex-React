export const getPokemonIdFromUrl = (url: string): number => {
	const segments = url.split('/').filter(Boolean);
	return parseInt(segments[segments.length - 1], 10);
};

export const getPokemonImageUrl = (id: number): string => {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const PokemonNameUpperCase = (name: string): string => {
	return name.charAt(0).toUpperCase() + name.slice(1);
};
