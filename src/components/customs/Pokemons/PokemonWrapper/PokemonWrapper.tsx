"use client"

import { usePokemonTypes } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"
import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import PokemonPagination from "./PokemonPagination/PokemonPagination";
import PokemonSize from "./PokemonSize/PokemonSize";
import pokemons from "@/contents/pokemons.json";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
    isList?: boolean;
}

const PokemonWrapper = ({ baseUrl, className, isList, ...props }: PokemonWrapperProps) => {
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
                <div className={`${styles.pokemonWrapper} ${isList ? styles.list : ""}`}>
                    {Array(12).fill(0).map((_, index) => 
                        <PokemonCard 
                            key={index} 
                            skeleton={true}
                            isList={isList}
                        />
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={`${className ? className : ""}`} {...props}>
            <PokemonSize total={data?.totalElements ?? 0}/>

            <div  className={`${styles.pokemonWrapper} ${isList ? styles.list : ""}`}>
                {(data?.content ?? []).map(({ name, imgUrl, types }, index) => 
                    <PokemonCard
                        key={index}
                        baseUrl={baseUrl}
                        name={name}
                        image={imgUrl}
                        types={types}
                        backgroundColor={getTypeColor(types[0])}
                        isList={isList}
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