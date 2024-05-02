"use server";

import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { firstLetterOfEachWordUppercase, unslugify } from '@/utils/reformat';
import { deletePokemon, getPokemon } from '@/libs/routes/entities/pokemon';
import ButtonGoBack from '@/components/ui/ButtonGoBack/ButtonGoBack';
import PokemonTypesTag from '@/components/customs/Pokedex/Pokemons/PokemonTypes/PokemonTypesTags/PokemonTypesTags';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import Button from '@/components/ui/Button/Button';
import PokedexDelete from '@/components/customs/Pokedex/PokedexDelete/PokedexDelete';
import { getCookies } from '@/actions/cookies';

interface PagePops {
    params: {
        name: string;
    };
}

const Page = async({ params }: PagePops) => {
    const data = await getPokemon(unslugify(params.name));
    const { token } = await getCookies();
    if ("error" in data) {
        return notFound();
    }

    const handleDelete = async () => {
        "use server"
        return await deletePokemon(data.name, token);
    }


    return (
        <main className={styles.main}>
            <nav className={styles.banner}> 
                <ButtonGoBack href="/admin/pokemons">Trainers</ButtonGoBack>
                <div className={styles.method}>
                    <PokedexDelete 
                        entityName="Pokemon"
                        deleteFunction={handleDelete} 
                        redirectToUrl='/admin/pokemons/' 
                        refreshTagName={`pokemon-${params.name}`}
                        successMessage={`The pokemon ${data.name} is succesfully deleted`}
                    />
                    <Button href={`/admin/pokemons/${params.name}/edit`} renderAs='link'>Edit</Button>
                </div>
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