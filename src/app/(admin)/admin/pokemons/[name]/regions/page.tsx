import PokemonRegionForm from "@/components/customs/Pokedex/Pokemons/PokemonRegionForm/PokemonRegionForm";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import { getCookies } from "@/actions/cookies";
import { notFound } from "next/navigation";
import { deletePokemonRegion, getPokemon } from "@/libs/routes/entities/pokemon";
import { unslugify } from "@/utils/reformat";
import PokedexDelete from "@/components/customs/Pokedex/PokedexDelete/PokedexDelete";
import styles from './page.module.scss';

type PageProps = {
    params: {
        name: string;
    };
}

const Page = async({ params }: PageProps) => {
    const unslugifiedName = unslugify(params.name);
    const data = await getPokemon(unslugifiedName);
    if ("error" in data || !data) {
        return notFound();
    }
    const { token } = await getCookies();

    

    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href={`/admin/pokemons/${data.name}`}>Trainers</ButtonGoBack>
            </nav>

            <div className="centered-page-content">
                {data.regions && data.regions.length > 0 &&
                    <div>
                        <h2>Pokemon&apos;s Regions</h2>
                        <ul className={styles.regions}>
                            {data.regions.map((region) => (
                                <li key={region.regionName}>
                                    <div className={styles.region}>
                                        <p>
                                            <strong className='h2'>{region.regionPokedexNumber}</strong> in {region.regionName} 
                                            <span></span>
                                        </p>
                                        <PokedexDelete 
                                            entityName="Region"
                                            deleteFunction={async () => {
                                                "use server"
                                                return await deletePokemonRegion(data.id, region.regionName, token);
                                            }}
                                            redirectToUrl={`/admin/pokemons/${data.name}/regions`}
                                            refreshTagName={`pokemon-${data.name}`}
                                            successMessage={`The region ${region.regionName} is succesfully deleted`}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <PokemonRegionForm token={token} pokemonName={unslugifiedName} currentRegionName={(data.regions ?? []).map(({regionName}) => regionName)} />
            </div>
        </main>
    )
}

export default Page;