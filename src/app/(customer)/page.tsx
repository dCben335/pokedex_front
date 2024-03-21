import Pokemons from "@/components/customs/Pokemons/Pokemons";
import styles from "./page.module.scss";

export default function Page() {

  return (
    <main className={styles.main}>
      <Pokemons
        baseUrl={"pokemons/"}
      />
    </main>
  );
}
