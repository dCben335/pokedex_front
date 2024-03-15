import Pokemons from "@/components/customs/Pokemons/Pokemons";
import styles from "./page.module.scss";
import PokemonSection from "@/components/customs/Pokemons/PokemonSection/PokemonSection";

export default function Page() {

  return (
    <main className={styles.main}>
      <PokemonSection 
        title="Liste des Pokémons" 
        isPageTitle={false}
      />
    </main>
  );
}
