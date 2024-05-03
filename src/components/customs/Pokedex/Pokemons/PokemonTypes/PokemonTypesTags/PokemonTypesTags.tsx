"use client";

import { usePokemonTypesContext } from '@/components/providers/PokemonTypesContext';
import styles from './PokemonTypesTags.module.scss';
import { firstLetterUppercase } from '@/utils/reformat';
import { useTheme } from '@/components/providers/ThemeContext';
import { HTMLAttributes } from 'react';
import Button from '@/components/ui/Button/Button';

type PokemonTypesTagProps = HTMLAttributes<HTMLUListElement> & {
    types: string[],
    updateAccentColor: boolean
    baseUrl: string
}

const PokemonTypesTag = ({ types, updateAccentColor, baseUrl, className, ...props } : PokemonTypesTagProps) => {
    const { findType } = usePokemonTypesContext(); 
    const { changeColor } = useTheme() 

    const colors = types.map((type) => findType(type)?.color)
    if (colors[0] && updateAccentColor) changeColor(colors[0])

    return (
        <ul className={styles.wrapper} {...props}>
            {types.map((type, index) => (
                <li key={type} >
                    <Button 
                        href={`${baseUrl}?typeOne=${type}`} 
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