"use client"

import { usePokemonTypesContext } from "@/components/providers/PokemonTypesContext";
import { toast } from "sonner";
import styles from "./TrainerWrapper.module.scss"
import useTrainers from "@/hooks/Trainers/useTrainers";
import PokemonPagination from "../../PokedexPagination/PokedexPagination";
import PokemonCard from "../../PodexCard/PokedexCard";
import PokemonSize from "../../PokedexSize/PokemonSize";

type PokemonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    baseUrl: string;
    isList?: boolean;
}

const TrainerWrapper = ({ baseUrl, className, isList, ...props }: PokemonWrapperProps) => {
    const {data, isLoading, error} = useTrainers();
    const { getTypeColor } = usePokemonTypesContext();

    console.log(data)

    if (error || (!isLoading && !data)) {
        console.log(error)
        toast.error("Error fetching pokemons");
        return (
            <></>
        )
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
                            baseUrl={baseUrl}
                            name={trainerName}
                            image={imgUrl}
                            types={[]}
                            suffixUrl={username}
                            backgroundColor={getTypeColor("normal")}
                            isList={isList}
                        />
                    )
                }
            </div>

            <PokemonPagination 
                currentPage={data?.pageable.pageNumber || 0}
                total={data?.totalPages || 0}
            />
        </div>
    );
};


export default TrainerWrapper