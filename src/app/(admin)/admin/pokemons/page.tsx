import Pokemons from "@/components/customs/Pokemons/Pokemons";
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss";

const Page = () => {
    return (
        <main>
            <Pokemons baseUrl={"/admin/pokemons"} isList={true}>
                <div>
                </div>
                    
                <Button renderAs="link" href="/admin/pokemons/create" className={styles.createButton}>
                    Create Pokemon
                </Button>
            </Pokemons>
        </main>
    );
}

export default Page;