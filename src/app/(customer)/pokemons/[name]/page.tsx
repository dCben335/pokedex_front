
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { unslugify } from '@/utils/reformat';
import StyledImage from '@/components/ui/StyledImage/StyledImage';
import { getPokemon } from '@/libs/routes/entities/pokemon';
import PokemonTypesTag from '@/components/customs/Pokedex/Pokemons/PokemonTypes/PokemonTypesTags/PokemonTypesTags';
import ButtonGoBack from '@/components/ui/ButtonGoBack/ButtonGoBack';
import PokedexVoiceSpeak from '@/components/customs/Pokedex/PokedexVoiceSpeak/PokedexVoiceSpeak';
import TrainerCatchButton from '@/components/customs/Pokedex/Trainers/TrainerCatchButton/TrainerCatchButton';
import { getTrainer } from '@/libs/routes/entities/trainer';
import { Trainer } from '@/libs/schemas/entities/trainer';
import { PokemonRegion, PokemonSearchResponse } from '@/libs/schemas/entities/pokemon';
import pokemonJson from '@/contents/pokemons.json';

const json = pokemonJson as PokemonSearchResponse
interface PagePops {
    params: {
        name: string;
    };
}

export async function generateStaticParams() {
    return json.content.map((pokemon) => ({
        name: pokemon.name,
    }));
}

const Page = ({ params }: PagePops) => {
    const pokemon = json.content.find(pokemon => pokemon.name === params.name);
    if (!pokemon) return notFound();


    const isTrainer = false;
    const isAlreadyCaught =   false;
    const isAlreadySeen =  false;


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
                    <ButtonGoBack href="/pokemons" />
                    <PokedexVoiceSpeak text={voiceText} />
                </div>
                {isTrainer && 
                    <div className={styles.methods}>
                        <TrainerCatchButton pokemonId={pokemon.id} isToCatch={false} already={isAlreadySeen}>Seen</TrainerCatchButton>
                        <TrainerCatchButton pokemonId={pokemon.id} isToCatch={true} already={isAlreadyCaught}>Caught</TrainerCatchButton>
                    </div>
                }
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
                        <PokemonTypesTag types={pokemon.types} baseUrl={"/pokemons/"} updateAccentColor={true}/>              
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