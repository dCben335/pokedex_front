"use client";

import Button from "@/components/ui/Button/Button";
import useGetPokemonTypes from "@/hooks/Pokemons/useGetPokemonTypes"
import { useSearchParams, useRouter, usePathname} from 'next/navigation';
import { useCallback } from "react";



const pokemonTypes = [
    { type: "NORMAL", color: "#A8A878" },
    { type: "FIRE", color: "#F08030" },
    { type: "FIGHTING", color: "#C03028" },
    { type: "WATER", color: "#6890F0" },
    { type: "FLYING", color: "#A890F0" },
    { type: "GRASS", color: "#78C850" },
    { type: "POISON", color: "#A040A0" },
    { type: "ELECTRIC", color: "#F8D030" },
    { type: "GROUND", color: "#E0C068" },
    { type: "PSYCHIC", color: "#F85888" },
    { type: "ROCK", color: "#B8A038" },
    { type: "ICE", color: "#98D8D8" },
    { type: "BUG", color: "#A8B820" },
    { type: "DRAGON", color: "#7038F8" },
    { type: "GHOST", color: "#705898" },
    { type: "DARK", color: "#705848" },
    { type: "STEEL", color: "#B8B8D0" },
    { type: "FAIRY", color: "#EE99AC" }
];




const PokemonCategories = () => {
    const { data, isLoading, isError } = useGetPokemonTypes();
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
    
        return params.toString()
    }, [searchParams])

    const removeQueryString = useCallback((name: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(name)
    
        return params.toString()
    }, [searchParams])



    
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Error</div>
        )
    }    
    
    const handleClick = (type: string) => {    
        const typeOne = searchParams.get('typeOne')
        const typeTwo = searchParams.get('typeTwo')

        if (type === typeOne) {  
            return router.push(`${pathname}?${removeQueryString('typeOne')}`)
        }

        if (type === typeTwo) {
            return router.push(`${pathname}?${removeQueryString('typeTwo')}`)
        }

        if (!typeOne) {
            return router.push(`${pathname}?${createQueryString('typeOne', type)}`)
        }

        if (!typeTwo) {
            return router.push(`${pathname}?${createQueryString('typeTwo', type)}`)
        }
    }

    return (
        <ul>
            {pokemonTypes.map(({type, color}) => (
                <li key={type}>
                    <Button 
                        style={{backgroundColor: color}}
                        onClick={() => handleClick(type)}
                    >
                        {type}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default PokemonCategories;
