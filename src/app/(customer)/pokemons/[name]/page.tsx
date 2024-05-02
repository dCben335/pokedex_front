"use server";

import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { unslugify } from '@/utils/reformat';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { getPokemon } from '@/libs/routes/entities/pokemon';
import PokemonTypesTag from '@/components/customs/Pokedex/Pokemons/PokemonTypes/PokemonTypesTags/PokemonTypesTags';
import ButtonGoBack from '@/components/ui/ButtonGoBack/ButtonGoBack';

interface PagePops {
    params: {
        name: string;
    };
}

export async function generateStaticParams() {
    const fakePokemons = [
        {
            name: "pikachu",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            description: "This is a pikachu",
            types: ["electric"]
        },
        {
            name: "charmander",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            description: "This is a charmander",
            types: ["fire"]
        },
        {
            name: "squirtle",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            description: "This is a squirtle",
            types: ["water"]
        }
    ]
    return fakePokemons.map((pokemon) => ({
        name: pokemon.name,
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
                        <PokemonTypesTag types={data.types} updateAccentColor={true}/>              
                    </div>
                    <p>{data.description}</p>
                </div>
            </div>
        </main>
    );
}

export default Page;