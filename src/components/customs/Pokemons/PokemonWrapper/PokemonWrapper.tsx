"use client"

import { usePokemonTypes } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"
import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import pokemons from "@/contents/pokemons.json";
import PokemonPagination from "./PokemonPagination/PokemonPagination";

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

    if (isLoading) {
        return (
            <div className={`${className ? className : ""}`} {...props}>
                <div className={`${styles.pokemonWrapper}`} >
                    {Array(20).fill(0).map((_, index) => 
                        <PokemonCard 
                            key={index} 
                            skeleton={true}
                        />
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={`${className ? className : ""}`} {...props}>
            <div className={`${styles.pokemonWrapper}`}>
                {(data?.content ?? []).map(({ name, imgUrl, types }, index) => 
                    <PokemonCard
                        key={index}
                        name={name}
                        image={imgUrl}
                        types={types}
                        backgroundColor={getTypeColor(types[0])}
                    />
                )}
            </div>
                <PokemonPagination 
                    currentPage={data?.pageable.pageNumber || 0}
                    total={data?.totalPages || 0}
                />
        </div>
    );
};


export default PokemonWrapper