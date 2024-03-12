import PokemonCard, { PokemonCard as PokemonCardProps } from "../PokemonCard/PokemonCard";
import styles from "./PokemonWrapper.module.scss"

interface PokemonWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    pokemons: PokemonCardProps[]
}

const PokemonWrapper = ({ pokemons }: PokemonWrapperProps) =>  {

    return (
        <div className={styles.pokemonWrapper}>
            {(pokemons ?? []).map(({name, image, types, backgroundColor}, index) => (
                <PokemonCard 
                    backgroundColor={backgroundColor}
                    key={index}
                    name={name} 
                    image={image} 
                    types={types} 
                />
                )
            )}
        </div>
    )

}

export default PokemonWrapper