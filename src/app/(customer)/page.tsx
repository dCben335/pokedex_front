import Pokemons from "@/components/customs/Pokedex/Pokemons/Pokemons";
import styles from "./page.module.scss";
import PokedexCard from "@/components/customs/Pokedex/PodexCard/PokedexCard";

export default function Page() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
          <section>
            <div>
              <h2>Pokemons</h2>
              <p>
                Discover all the pokemons from the different regions and generations.
              </p>
              <p>
                You can also ask for a specific pokemon.
              </p>
            </div>
            <div className={styles.cards}>
              <PokedexCard image="/images/base_pokemons.png" url="/pokemons" name=""/>
              <PokedexCard image="/images/pikachu.png" url="/pokemons" name=""/>
              <PokedexCard image="/images/kanto_pokemons.png" url="/pokemons" name=""/>
            </div>
          </section>
          <section>
            <div>
              <h2>Trainers</h2>
              <p>
                Discover all the trainers that user created and shared and their pokemons.
              </p>
              <p>
                Don&apos;t forget to create your own trainer and share it with the community.
              </p>
            </div>
            <div className={styles.cards}>
              <PokedexCard image="/images/pierre.png" url="/pokemons" name=""/>
              <PokedexCard image="/images/sacha.png" url="/pokemons" name=""/>
              <PokedexCard image="/images/ondine.png" url="/pokemons" name=""/>
            </div>
          </section>
      </div>
    </main>
  );
}
