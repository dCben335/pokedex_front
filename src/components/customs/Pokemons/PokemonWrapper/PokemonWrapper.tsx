"use client"

import { usePokemonTypes } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"
import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import pokemons from "@/contents/pokemons.json";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> 

const PokemonWrapper = ({ className, ...props }: PokemonWrapperProps) => {
    const {data, isLoading, isError} = useGetPokemons();
    const { getTypeColor } = usePokemonTypes();

    if (isError || (!isLoading && !data)) {
        toast.error("Error fetching pokemons");
        return (
            <></>
        )
    }
    
    return (
        <div className={styles.pokemonWrapper} {...props}>
            {isLoading
                ? Array(20).fill(0).map((_, index) => (
                    <PokemonCard 
                        key={index} 
                        skeleton={true}
                    />
                )) 
                : pokemons.map(({ name, image, types }, index) => (
                    <PokemonCard
                        key={index}
                        name={name}
                        image={image}
                        types={types}
                        backgroundColor={getTypeColor(types[0])}
                    />
                ))
            }
        </div>
    );
};


export default PokemonWrapper