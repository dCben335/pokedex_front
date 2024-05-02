import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { firstLetterOfEachWordUppercase, unslugify } from '@/utils/reformat';
import { getPokemon } from '@/libs/routes/entities/pokemon';
import { getCookies } from '@/actions/cookies';
import PokemonForm from '@/components/customs/Pokedex/Pokemons/PokemonForm/PokemonForm';


type PageProps = {
    params: {
        name: string;
    };
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