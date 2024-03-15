import PokemonCategories from "../PokemonCategories/PokemonCategories";
import Pokemons from "../Pokemons";

interface PokemonSectionProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    isPageTitle: boolean;
}
const PokemonSection = ({ title, isPageTitle , ...props }: PokemonSectionProps) => {
    const Title = isPageTitle ? "h1" : "h2"
    
    return (
        <section {...props}>
            <Title>{title}</Title>
            
            <PokemonCategories />
            <Pokemons />
        </section>
    );
}

export default PokemonSection;