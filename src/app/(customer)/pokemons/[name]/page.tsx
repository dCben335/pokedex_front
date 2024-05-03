"use server";

import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { firstLetterOfEachWordUppercase, unslugify } from '@/utils/reformat';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { getPokemon, getPokemons } from '@/libs/routes/entities/pokemon';
import PokemonTypesTag from '@/components/customs/Pokedex/Pokemons/PokemonTypes/PokemonTypesTags/PokemonTypesTags';
import ButtonGoBack from '@/components/ui/ButtonGoBack/ButtonGoBack';

interface PagePops {
    params: {
        name: string;
    };
}

export async function generateStaticParams() {
    const data = await getPokemons("size=100");
    if ("error" in data) {
        return [];
    }
    return data.content.map((pokemon) => ({
        params: {
            name: pokemon.name,
        },
    }));
}

const Page = async({ params }: PagePops) => {
    const data = await getPokemon(unslugify(params.name));
    if ("error" in data) {
        return notFound();
    }


    return (
        <main className={styles.main}>
            <nav className={styles.banner}> 
                <ButtonGoBack href="/pokemons">Trainers</ButtonGoBack>
            </nav>
            <div className={styles.container}>
                <StyledImage 
                    className={styles.imageContainer}
                    src={data.imgUrl} 
                    alt={data.name} 
                    fill
                />
                <div>
                    <div className={styles.centered}>
                        <h1>{data.name}</h1>
                        <PokemonTypesTag types={data.types} updateAccentColor={true} baseUrl='/pokemons'/>              
                    </div>
                    <p>{data.description}</p>
                </div>
            </div>
        </main>
    );
}

export default Page;