"use client"

import { usePokemonTypes } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"
import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import pokemons from "@/contents/pokemons.json";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> 

const PokemonWrapper = ({ className, ...props }: PokemonWrapperProps) => {
    const {data, isLoading, error} = useGetPokemons();
    const { getTypeColor } = usePokemonTypes();

    if (error || (!isLoading && !data)) {
        toast.error("Error fetching pokemons");
        return (
            <></>
        )
    }
    
    return (
        <div className={`${styles.pokemonWrapper} ${className ? className : ""}`} {...props}>
            {isLoading
                ? Array(20).fill(0).map((_, index) => (
                    <PokemonCard 
                        key={index} 
                        skeleton={true}
                    />
                )) 
                : data?.content.map(({ name, imgUrl, types }, index) => (
                    <PokemonCard
                        key={index}
                        name={name}
                        image={imgUrl}
                        types={types}
                        backgroundColor={getTypeColor(types[0])}
                    />
                ))
            }
        </div>
    );
};


export default PokemonWrapper