import Pokemons from "@/components/customs/Pokemons/Pokemons";
import styles from "./page.module.scss";
import { Suspense } from "react";

export default function Page() {

  return (
    <main className={styles.main}>
        <Pokemons
          title="Liste des Pokémons" 
          isPageTitle={true}
        />
    </main>
  );
}