import { PropsWithChildren, Suspense } from "react";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import styles from "./Pokemons.module.scss";
import PokedexFilters from "../PokedexFilters/PokedexFilters";

type PokemonsProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{
    baseUrl: string
    isList?: boolean
}>


const Pokemons = ({ children, className, baseUrl, isList, ...props}: PokemonsProps) => {
    
    return (
        <section className={`${styles.pokemons} ${className ? className : ""}`} {...props}>
            <Suspense fallback={<></>}>
                <PokedexFilters isPokemons={true} />
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