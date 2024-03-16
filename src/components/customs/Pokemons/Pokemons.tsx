import PokemonCategories from "./PokemonFilters/PokemonFilters";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";

interface PokemonSectionProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    isPageTitle: boolean;
}
const Pokemons = ({ title, isPageTitle , ...props }: PokemonSectionProps) => {
    const Title = isPageTitle ? "h1" : "h2";
    
    return (
        <section {...props}>
            <Title>{title}</Title>
            <PokemonCategories />
            <PokemonWrapper />
        </section>
    );
}

export default Pokemons;