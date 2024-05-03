"use client"

import { usePokemonTypesContext } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import usePokemons from "@/hooks/usePokemons";
import PokedexCard from "../../PodexCard/PokedexCard";
import PokedexPagination from "../../PokedexPagination/PokedexPagination";
import PokedexSize from "../../PokedexSize/PokedexSize";
import styles from "./PokemonWrapper.module.scss"
import { slugify } from "@/utils/reformat";
import pokemonJson from "@/contents/pokemons.json";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
    isList?: boolean;
}



const PokemonWrapper = ({ baseUrl, className, isList,  ...props }: PokemonWrapperProps) => {
    const data = pokemonJson;
    const isLoading = false;
    const { getTypeColor } = usePokemonTypesContext();
  
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
                    ) : (data?.content ?? []).map(({ name, imgUrl, types, id }, index) => 
                        <PokedexCard
                            key={id}
                            id={id}
                            url={`${baseUrl}/${slugify(name)}`}
                            name={name}
                            image={imgUrl}
                            types={types}
                            backgroundColor={getTypeColor(types[0])}
                            isList={isList}
                            scale={isList ? 1.01 : 1.05}
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