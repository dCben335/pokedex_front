import PokemonCategories from "./PokemonFilters/PokemonFilters";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import styles from "./Pokemons.module.scss";

interface PokemonSectionProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    isPageTitle: boolean;
}


const Pokemons = ({ title, isPageTitle , ...props }: PokemonSectionProps) => {
    const Title = isPageTitle ? "h1" : "h2";
    
    return (
        <section {...props} className={styles.pokemons}>
            <PokemonCategories />
            <PokemonWrapper className={"container"} />
        </section>
    );
}

export default Pokemons;