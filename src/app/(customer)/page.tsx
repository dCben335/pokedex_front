import styles from "./page.module.scss";
import PokedexCard, { PokedexCardProps } from "@/components/customs/Pokedex/PodexCard/PokedexCard";

const pokemonCards = [
  {
    image: "/images/base_pokemons.png",
    url: "/pokemons"
  },
  {
    image: "/images/pikachu.png",
    url: "/pokemons",
    backgroundColor: "#FFCB05"
  },
  {
    image: "/images/kanto_pokemons.png",
    url: "/pokemons",
    backgroundColor: "#3368B1"
  }
] satisfies PokedexCardProps[]

const trainerCards = [
  {
    image: "/images/pierre.png",
    url: "/trainers",
    backgroundColor: "#3368B1",
  },
  {
    image: "/images/sacha.png",
    url: "/trainers"
  },
  {
    image: "/images/ondine.png",
    url: "/trainers",
    backgroundColor: "#FFCB05"
  }
] satisfies PokedexCardProps[]


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
              {pokemonCards.map((card, index) => (
                <PokedexCard key={index} image={card.image} url={card.url} backgroundColor={card.backgroundColor}/>
              ))}
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
              {trainerCards.map((card, index) => (
                <PokedexCard key={index} image={card.image} url={card.url} backgroundColor={card.backgroundColor}/>
              ))}
            </div>
          </section>
      </div>
    </main>
  );
}
