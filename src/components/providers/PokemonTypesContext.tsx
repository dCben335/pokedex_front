"use client"

import usePokemonTypes from '@/hooks/usePokemonTypes';
import { createContext, useContext } from 'react';
import { PokemonType, PokemonTypeResponse } from '@/libs/schemas/entities/pokemon';
import { toast } from 'sonner';

interface PokemonTypesContextType extends PokemonTypeResponse {
    getTypeColor: (type: string) => string; 
    findType: (typeName: string) => PokemonType | undefined;
    getRandomTypeColor: () => string;
}

const PokemonTypesContext = createContext<PokemonTypesContextType>({
    types: [],
    count: 0,
    getTypeColor: () => '',
    findType: () => undefined,
    getRandomTypeColor: () => '',
});

export const usePokemonTypesContext = () => {
    return useContext(PokemonTypesContext);
};

export const PokemonTypesProvider = ({ children } : React.PropsWithChildren ) => {
    const { data, isLoading, error } = usePokemonTypes();

    if (isLoading || error || !data) {
        if (error) toast.error(error.message);
        if (!isLoading && !error && !data) toast.error('Error fetching pokemon types');

        return (
            <>
                { children }
            </>
        );
    }    

    const findType = (typeName: string) => {
        return data.types.find(({name}) => name === typeName.toUpperCase());
    };

    const getTypeColor = (typeName: string): string => {
        if (!typeName) return '';

        const correspondingType = findType(typeName);
        
        return correspondingType?.color || '';
    };

    const getRandomTypeColor = (): string => {
        const randomIndex = Math.floor(Math.random() * data.types.length);
        return data.types[randomIndex].color;
    }

    return (
        <PokemonTypesContext.Provider value={{ types: data.types, count: data.count, getTypeColor, getRandomTypeColor, findType }}>
            {children}
        </PokemonTypesContext.Provider>
    );
};

