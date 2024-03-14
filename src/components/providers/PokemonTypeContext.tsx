"use client"
import useGetPokemonTypes from '@/hooks/Pokemons/useGetPokemonTypes';
import { createContext, useContext } from 'react';


export type PokemonType = {
    name: string;
    color: string;
};

interface PokemonTypeContextType {
    types: PokemonType[];
    count: number; 
    getTypeColor: (type: string) => string; 
}


const PokemonTypeContext = createContext<PokemonTypeContextType>({
    types: [],
    count: 0,
    getTypeColor: () => '',
});

export const usePokemonType = () => {
    return useContext(PokemonTypeContext);
};

export const PokemonTypeProvider = ({ children } : React.PropsWithChildren ) => {
    const { data, isLoading, error } = useGetPokemonTypes(); // Assuming this hook fetches Pokemon types

    if (isLoading || error) {
        return (
            <>
                {children}
            </>
        );
    }

    const getTypeColor = (typeName: string): string => {
        if (!typeName) return '';
        const correspondingType = (data.types as PokemonType[]).find(({name}) => name === typeName.toUpperCase());
        return correspondingType?.color || '';
    };

    return (
        <PokemonTypeContext.Provider value={{ types: data.types, count: data.count, getTypeColor }}>
            {children}
        </PokemonTypeContext.Provider>
    );
};

