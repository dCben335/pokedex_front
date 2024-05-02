import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { unslugify } from '@/utils/reformat';
import { getPokemon } from '@/libs/routes/entities/pokemon';
import { getCookies } from '@/actions/cookies';
import PokemonForm from '@/components/customs/Pokedex/Pokemons/PokemonForm/PokemonForm';


type PageProps = {
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


const Page = async({ params }: PageProps) => {
    const data = await getPokemon(unslugify(params.name));
    if ("error" in data || !data) {
        return notFound();
    }
    const { token } = await getCookies();
    
    
    return (
        <main className="centered-page-content">
            <PokemonForm
                key={data.id} 
                pokemonId={data.id}
                token={token} 
                editMode={true}
                defaultValues={{
                    name: data.name,
                    imgUrl: data.imgUrl,
                    description: data.description,
                    typeOne: data.types[0],
                    typeTwo: data.types[1],
                }}
            />
        </main>
    )
}

export default Page;