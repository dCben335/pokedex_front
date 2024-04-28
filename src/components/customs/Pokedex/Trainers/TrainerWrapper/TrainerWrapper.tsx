"use client"

import { usePokemonTypesContext } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import styles from "./TrainerWrapper.module.scss"
import useTrainers from "@/hooks/useTrainers";
import PokedexPagination from "../../PokedexPagination/PokedexPagination";
import PokemonCard from "../../PodexCard/PokedexCard";
import PokemonSize from "../../PokedexSize/PokedexSize";
import { slugify } from "@/utils/reformat";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
    isList?: boolean;
}

const TrainerWrapper = ({ baseUrl, className, isList, ...props }: PokemonWrapperProps) => {
    const {data, isLoading, error} = useTrainers();
    const { getTypeColor } = usePokemonTypesContext();

    if (error || (!isLoading && !data)) {
        return toast.error("Error fetching pokemons");
    }

    return (
        <div className={`${className ? className : ""}`} {...props}>
            <PokemonSize total={data?.totalElements ?? 0}/>

            <div  className={`${styles.trainerWrapper} ${isList ? styles.list : ""}`}>
                {isLoading 
                    ? Array(12).fill(0).map((_, index) =>
                        <PokemonCard 
                            key={index} 
                            skeleton={true}
                            isList={isList}
                        />
                    ) : (data?.content ?? []).map(({ trainerName, imgUrl, username }, index) => 
                        <PokemonCard
                            key={index}
                            url={`${baseUrl}/${slugify(username)}`}
                            name={trainerName}
                            image={imgUrl}
                            types={[]}
                            backgroundColor={getTypeColor("normal")}
                            isList={isList}
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


export default TrainerWrapper