"use client";

import { PropsWithChildren, Suspense } from "react";
import styles from "./Trainers.module.scss";
import TrainerWrapper from "./TrainerWrapper/TrainerWrapper";
import PokemonFilters from "../PokedexFilters/PokedexFilters";

type TrainersProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{
    baseUrl: string
    isList?: boolean
}>

const Trainers = ({ baseUrl, isList, className, children, ...props  } : TrainersProps) => {
    
    return (
        <section className={`${styles.pokemons} ${className ? className : ""}`} {...props}>
            <Suspense fallback={<></>}>
                <PokemonFilters />
                {children}
                <TrainerWrapper 
                    className={"cont"} 
                    baseUrl={baseUrl} 
                    isList={isList}
                />
            </Suspense>
        </section>
    );
}


export default Trainers;