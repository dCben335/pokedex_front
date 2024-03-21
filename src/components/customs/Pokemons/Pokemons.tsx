import { PropsWithChildren, Suspense } from "react";
import PokemonCategories from "./PokemonFilters/PokemonFilters";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import styles from "./Pokemons.module.scss";
import PokemonSize from "./PokemonWrapper/PokemonSize/PokemonSize";

type PokemonSectionProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{
    baseUrl: string
    isList?: boolean
}>


const Pokemons = ({ children, className, baseUrl, isList, ...props}: PokemonSectionProps) => {
    
    return (
        <section className={`${styles.pokemons} ${className ? className : ""}`} {...props}>
            <Suspense fallback={<></>}>
                <PokemonCategories />
                {children}
                <PokemonWrapper 
                    className={"cont"} 
                    baseUrl={baseUrl} 
                    isList={isList}
                />
            </Suspense>
        </section>
    );
}

export default Pokemons;