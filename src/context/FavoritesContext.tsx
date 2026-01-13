import React, { useState, useEffect, useContext, createContext } from 'react';
import type { ReactNode } from 'react';
import type { IPokemonCardData } from '../types/pokemon';

interface IFavoritesContext {
	favorites: IPokemonCardData[];
	addFavorite: (pokemon: IPokemonCardData) => void;
	removeFavorite: (id: number) => void;
	isFavorite: (id: number) => boolean;
}

const FavoritesContext = React.createContext<IFavoritesContext | undefined>(undefined);

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const [favorites, setFavorites] = useState<IPokemonCardData[]>([]);

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites');
		if (storedFavorites) {
			try {
				setFavorites(JSON.parse(storedFavorites));
			} catch (error) {
				console.error('Error parsing favorites from localStorage', error);
			}
		}
	}, []);

	const saveToLocalStorage = (favorites: IPokemonCardData[]) => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	};

	const addFavorite = (pokemon: IPokemonCardData) => {
		if (!favorites.some((fav) => fav.id === pokemon.id)) {
			const updatedFavorites = [...favorites, pokemon];
			setFavorites(updatedFavorites);
			saveToLocalStorage(updatedFavorites);
		}
	};

	const removeFavorite = (id: number) => {
		const updatedFavorites = favorites.filter((fav) => fav.id !== id);
		setFavorites(updatedFavorites);
		saveToLocalStorage(updatedFavorites);
	};

	const isFavorite = (id: number): boolean => {
		return favorites.some((fav) => fav.id === id);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};
