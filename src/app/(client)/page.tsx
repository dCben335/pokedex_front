import Pokemon from "@/components/customs/Pokemon/Pokemon";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      ¨<Pokemon />
    </main>
  );
}
