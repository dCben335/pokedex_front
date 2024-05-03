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

const Page = async({ params }: PagePops) => {
    const pokemon = await getPokemon(unslugify(params.name));
    const { token } = await getCookies();
    if ("error" in pokemon) {
        return notFound();
    }

    const handleDelete = async () => {
        "use server"
        return await deletePokemon(pokemon.name, token);
    }


    const voiceText = `
        This is the page of the ${pokemon.name} pokemon. 
        This pokemon is a ${pokemon.types.join(' and ')} pokemon. ${pokemon.description}. 
        ${(pokemon.regions && pokemon.regions.length > 0) 
            ? `It can be found in the following regions: ${pokemon.regions.map(region => `number ${region.regionPokedexNumber} in ${region.regionName}`).join(', ')}` 
            : ''
        }.  
    `;


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
                        successMessage={`The pokemon ${pokemon.name} is succesfully deleted`}
                    />
                    <Button href={`/admin/${params.name}/edit`} renderAs='link'>Edit</Button>
                    <Button href={`/admin/${params.name}/regions`} renderAs='link'>Regions</Button>
                </div>
            </nav>
            <div className={styles.container}>
                <StyledImage 
                    className={styles.imageContainer}
                    src={pokemon.imgUrl} 
                    alt={pokemon.name} 
                    fill
                />
                <div>
                    <div className={styles.centered}>
                        <h1>{pokemon.name}</h1>
                        <PokemonTypesTag types={pokemon.types} baseUrl={"/admin/"} updateAccentColor={true}/>              
                    </div>
                    <div className={styles.gridContainer}>
                        <section >
                            {pokemon.description && 
                                <>
                                    <h2>Pokemon&apos;s description</h2>
                                    <p>{pokemon.description}</p>
                                </>
                            }
                        </section>
                        <section>
                            {pokemon.regions && (pokemon?.regions ?? []).length > 0 && 
                                <>
                                    <h2>Pokemon&apos;s Regions</h2>
                                    <ul className={styles.regions}>
                                        {pokemon.regions.map((region) => (
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