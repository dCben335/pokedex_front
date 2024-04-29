"use client";

import { PropsWithChildren, Suspense } from "react";
import styles from "./Trainers.module.scss";
import TrainerWrapper from "./TrainerWrapper/TrainerWrapper";
import PokedexFilters from "../PokedexFilters/PokedexFilters";
import Loading from "@/components/ui/Loading/Loading";

type TrainersProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{
    baseUrl: string
    isList?: boolean
}>

const Trainers = ({ baseUrl, isList, className, children, ...props  } : TrainersProps) => {
    
    return (
        <section className={`${styles.pokemons} ${className ? className : ""}`} {...props}>
            <Suspense fallback={<Loading />}>
                <PokedexFilters isPokemons={false} entityName="trainer"/>
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