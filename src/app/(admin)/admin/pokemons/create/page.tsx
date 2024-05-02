"use server"

import { getCookies } from "@/actions/cookies";
import PokemonForm from "@/components/customs/Pokedex/Pokemons/PokemonForm/PokemonForm";



const Page = async({  }) => {
    const { token } = await getCookies();

    return (
        <main>
            <PokemonForm key={"create"} token={token} />
        </main>
    )
}

export default Page;