"use client"

import { usePokemonTypes } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"
import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import pokemons from "@/contents/pokemons.json";
import PokemonPagination from "./PokemonPagination/PokemonPagination";
import PokemonSize from "./PokemonSize/PokemonSize";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
}

const PokemonWrapper = ({ baseUrl, className, ...props }: PokemonWrapperProps) => {
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
                    {Array(12).fill(0).map((_, index) => 
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
            <PokemonSize total={data?.totalElements ?? 0}/>

            <div className={`${styles.pokemonWrapper}`}>
                {(data?.content ?? []).map(({ name, imgUrl, types }, index) => 
                    <PokemonCard
                        key={index}
                        baseUrl={baseUrl}
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