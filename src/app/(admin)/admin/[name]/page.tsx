"use server";

import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { unslugify } from '@/utils/reformat';
import { deletePokemon, getPokemon, getPokemons } from '@/libs/routes/entities/pokemon';
import ButtonGoBack from '@/components/ui/ButtonGoBack/ButtonGoBack';
import PokemonTypesTag from '@/components/customs/Pokedex/Pokemons/PokemonTypes/PokemonTypesTags/PokemonTypesTags';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import Button from '@/components/ui/Button/Button';
import PokedexDelete from '@/components/customs/Pokedex/PokedexDelete/PokedexDelete';
import { getCookies } from '@/actions/cookies';
import PokedexVoiceSpeak from '@/components/customs/Pokedex/PokedexVoiceSpeak/PokedexVoiceSpeak';

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
    const { token } = await getCookies();
    if ("error" in data) {
        return notFound();
    }

    const handleDelete = async () => {
        "use server"
        return await deletePokemon(data.name, token);
    }


    const voiceText = `
        This is the page of the ${data.name} pokemon. 
        This pokemon is a ${data.types.join(' and ')} pokemon. ${data.description}. 
        It can be found in the following regions: 
            ${(data.regions ?? []).map(region => `number ${region.regionPokedexNumber} in ${region.regionName}`).join(', ')}.`;


    return (
        <main className={styles.main}>
            <nav className={styles.banner}> 
                <div className={styles.buttons}>
                    <ButtonGoBack href="/admin" />
                    <PokedexVoiceSpeak text={voiceText} />
                </div>
                <div className={styles.methods}>
                    <PokedexDelete 
                        entityName="Pokemon"
                        deleteFunction={handleDelete} 
                        redirectToUrl='/admin' 
                        refreshTagName={`pokemon-${params.name}`}
                        successMessage={`The pokemon ${data.name} is succesfully deleted`}
                    />
                    <Button href={`/admin/${params.name}/edit`} renderAs='link'>Edit</Button>
                    <Button href={`/admin/${params.name}/regions`} renderAs='link'>Regions</Button>
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
                        <PokemonTypesTag types={data.types} baseUrl={"/admin/"} updateAccentColor={true}/>              
                    </div>
                    <div className={styles.gridContainer}>
                        <section >
                            {data.description && 
                                <>
                                    <h2>Pokemon&apos;s description</h2>
                                    <p>{data.description}</p>
                                </>
                            }
                        </section>
                        <section>
                            {data.regions && 
                                <>
                                    <h2>Pokemon&apos;s Regions</h2>
                                    <ul className={styles.regions}>
                                        {data.regions.map((region) => (
                                            <li key={region.regionName}>
                                                <p className={styles.region}>
                                                    <strong className='h2'>{region.regionPokedexNumber}</strong> in {region.regionName}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;