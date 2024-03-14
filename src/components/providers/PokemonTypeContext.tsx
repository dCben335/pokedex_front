"use client"

import useGetPokemonTypes from '@/hooks/Pokemons/useGetPokemonTypes';
import { createContext, useContext } from 'react';
import { PokemonTypeRequest } from '@/types/pokemon';
import { toast } from 'sonner';

interface PokemonTypeContextType extends PokemonTypeRequest {
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

    if (isLoading || error || !data) {
        if (error) toast.error(error.message);
        if (!error && !data) toast.error('Error fetching pokemon types');

        return (
            <>
                { children }
            </>
        );
    }

    toast.success('Pokemon types fetched successfully')
    

    const getTypeColor = (typeName: string): string => {
        if (!typeName) return '';

        const correspondingType = data.types.find(
            ({name}) => name === typeName.toUpperCase()
        );
        
        return correspondingType?.color || '';
    };

    return (
        <PokemonTypeContext.Provider value={{ types: data.types, count: data.count, getTypeColor }}>
            {children}
        </PokemonTypeContext.Provider>
    );
};

