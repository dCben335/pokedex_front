import Pokemons from "@/components/customs/Pokedex/Pokemons/Pokemons";
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss";

const Page = () => {
    return (
        <main>
            <Pokemons baseUrl={"/admin"} isList={true}>
                <Button renderAs="link" href="/admin/create" className={styles.createButton}>
                    Create Pokemon
                </Button>
            </Pokemons>
        </main>
    );
}

export default Page;