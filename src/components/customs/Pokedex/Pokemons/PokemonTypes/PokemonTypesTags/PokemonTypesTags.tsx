"use client";

import { usePokemonTypesContext } from '@/components/providers/PokemonTypesContext';
import styles from './PokemonTypesTags.module.scss';
import { firstLetterUppercase } from '@/utils/reformat';
import { useTheme } from '@/components/providers/ThemeContext';
import { useCallback } from 'react';

type PokemonTypesTagProps = {
    types: string[],
    updateAccentColor: boolean
}

const PokemonTypesTag = ({ types, updateAccentColor } : PokemonTypesTagProps) => {
    const { findType } = usePokemonTypesContext(); 
    const { changeColor } = useTheme() 

    changeColor(findType(types[0])?.color || '')

    return (
        <ul className={styles.wrapper}>
            {types.map((type) => (
                <li key={type} style={{backgroundColor: findType(type)?.color}}>
                    {firstLetterUppercase(type)}
                </li>
            ))}
        </ul>   
    );
};

export default PokemonTypesTag;