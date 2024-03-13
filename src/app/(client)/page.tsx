import Pokemon from "@/components/customs/Pokemons/Pokemons";
import styles from "./page.module.scss";
import PokemonSection from "@/components/customs/Pokemons/PokemonSection/PokemonSection";

export default function Page() {

  return (
    <main className={styles.main}>
      <PokemonSection>
        <Pokemon />
      </PokemonSection>
    </main>
  );
}
