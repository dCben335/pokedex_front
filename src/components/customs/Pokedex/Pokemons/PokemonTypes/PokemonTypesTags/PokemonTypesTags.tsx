"use client";

import { usePokemonTypesContext } from '@/components/providers/PokemonTypesContext';
import styles from './PokemonTypesTags.module.scss';
import { firstLetterUppercase } from '@/utils/reformat';
import { useTheme } from '@/components/providers/ThemeContext';
import { useCallback } from 'react';
import Button from '@/components/ui/Button/Button';
import PokemonCategoryButton from '../PokemonTypesModal/PokemonTypesButton';

type PokemonTypesTagProps = {
    types: string[],
    updateAccentColor: boolean
}

const PokemonTypesTag = ({ types, updateAccentColor } : PokemonTypesTagProps) => {
    const { findType } = usePokemonTypesContext(); 
    const { changeColor } = useTheme() 

    const colors = types.map((type) => findType(type)?.color)
    if (colors[0] && updateAccentColor) changeColor(colors[0])

    return (
        <ul className={styles.wrapper}>
            {types.map((type, index) => (
                <li key={type} >
                    <Button 
                        href={`/pokemons?typeOne=${type}`} 
                        renderAs='link'
                        className={styles.tag} 
                        style={{ 
                            backgroundColor: colors[index],
                            border: `1px solid ${colors[index]}`,
                         }}>
                        {firstLetterUppercase(type)}
                    </Button>
                </li>
            ))}
        </ul>   
    );
};

export default PokemonTypesTag;