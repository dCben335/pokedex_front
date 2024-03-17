import { Suspense } from "react";
import PokemonCategories from "./PokemonFilters/PokemonFilters";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import styles from "./Pokemons.module.scss";

interface PokemonSectionProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    isPageTitle: boolean;
}


const Pokemons = ({ title, isPageTitle, className, ...props }: PokemonSectionProps) => {
    const Title = isPageTitle ? "h1" : "h2";
    
    return (
        <section className={`${styles.pokemons} ${className ? className : ""}`} {...props}>
            <Suspense fallback={<></>}>
                <PokemonCategories />
                <PokemonWrapper className={"cont"} />
            </Suspense>
        </section>
    );
}

export default Pokemons;