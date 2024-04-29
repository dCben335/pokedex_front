"use client"

import { usePokemonTypesContext } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import usePokemons from "@/hooks/usePokemons";
import PokedexCard from "../../PodexCard/PokedexCard";
import PokedexPagination from "../../PokedexPagination/PokedexPagination";
import PokedexSize from "../../PokedexSize/PokedexSize";
import styles from "./PokemonWrapper.module.scss"
import { slugify } from "@/utils/reformat";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
    isList?: boolean;
}

const PokemonWrapper = ({ baseUrl, className, isList, ...props }: PokemonWrapperProps) => {
    const { data, isLoading, error } = usePokemons();
    const { getTypeColor } = usePokemonTypesContext();

    if (error || (!isLoading && !data)) {
        toast.error(error?.message ?? "Error fetching pokemons");
        return (
            <div>Error fetching pokemons</div>
        )
    }


    return (
        <div className={`${className ? className : ""}`} {...props}>
            <PokedexSize total={data?.totalElements ?? 0} entityName="pokemons"/>

            <div  className={`${styles.pokemonWrapper} ${isList ? styles.list : ""}`}>
                {isLoading 
                    ? Array(12).fill(0).map((_, index) =>
                        <PokedexCard 
                            key={index} 
                            skeleton={true}
                            isList={isList}
                        />
                    ) : (data?.content ?? []).map(({ name, imgUrl, types }, index) => 
                        <PokedexCard
                            key={index}
                            url={`${baseUrl}/${slugify(name)}`}
                            name={name}
                            image={imgUrl}
                            types={types}
                            backgroundColor={getTypeColor(types[0])}
                            isList={isList}
                            scale={isList ? 1.01 : 1.1}
                        />
                    )
                }
            </div>

            <PokedexPagination 
                currentPage={data?.pageable.pageNumber || 0}
                total={data?.totalPages || 0}
            />
        </div>
    );
};


export default PokemonWrapper