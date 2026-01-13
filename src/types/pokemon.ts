export interface IPokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: IPokemonBasic[];
}
export interface IPokemonBasic {
	name: string;
	url: string;
}

export interface IPokemonCardData {
	id: number;
	name: string;
	image: string;
	types?: string[];
}

export interface IPokemonDetails {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	abilites: {
		ability: {
			name: string;
			url: string;
		};
		isHidden: boolean;
		slot: number;
	}[];
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}[];
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}[];
	sprites: {
		front_default: string;
	};
}
