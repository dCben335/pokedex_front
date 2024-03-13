import PokemonCard, { PokemonCard as PokemonCardProps } from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"

interface PokemonWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    pokemons: PokemonCardProps[]
    skeleton?: false
}

interface PokemonSkeletonWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton: true
}

const PokemonWrapper: React.FC<PokemonWrapperProps | PokemonSkeletonWrapperProps> = ({ className, skeleton, ...props }) => {
    const { pokemons, ...newProps } = props as PokemonWrapperProps;
    
    return (
        <div className={styles.pokemonWrapper} {...newProps}>
            {skeleton
                ? Array(20).fill(0).map((_, index) => (
                    <PokemonCard 
                        key={index} 
                        skeleton={true}
                    />
                )) 
                : pokemons.map(({ name, image, types, backgroundColor }, index) => (
                    <PokemonCard
                        key={index}
                        name={name}
                        image={image}
                        types={types}
                        backgroundColor={backgroundColor}
                    />
                ))
            }
        </div>
    );
};


export default PokemonWrapper