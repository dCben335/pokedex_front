"use server"

import { getCookies } from "@/actions/cookies";
import PokemonForm from "@/components/customs/Pokedex/Pokemons/PokemonForm/PokemonForm";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import styles from './page.module.scss';

const Page = async({  }) => {
    const { token } = await getCookies();

    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href={`/admin`} />
            </nav>
            <div className="centered-page-content">
                <PokemonForm token={token} />
            </div>
        </main>
    )
}

export default Page;