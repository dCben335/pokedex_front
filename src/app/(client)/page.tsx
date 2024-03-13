import Pokemon from "@/components/customs/Pokemons/Pokemons";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      <Pokemon />
    </main>
  );
}
