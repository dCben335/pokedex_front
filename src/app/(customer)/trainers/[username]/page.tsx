import Button from "@/components/ui/Button/Button";
import { notFound } from "next/navigation";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import styles from "./page.module.scss";
import { slugify, unslugify } from "@/utils/reformat";
import PokedexDelete from "@/components/customs/Pokedex/PokedexDelete/PokedexDelete";
import PokedexVoiceSpeak from "@/components/customs/Pokedex/PokedexVoiceSpeak/PokedexVoiceSpeak";
import StyledImage from "@/components/ui/StyledImage/StyledImage";
import { Trainer, TrainerSearchResponse } from "@/libs/schemas/entities/trainer";
import PokedexCard from "@/components/customs/Pokedex/PodexCard/PokedexCard";
import trainerJson from "@/contents/trainers.json";

const json = trainerJson as TrainerSearchResponse;
interface PagePops {
    params: {
        username: string;
    };
}

export async function generateStaticParams() {    
    return json.content.map((trainer) => ({
        username: trainer.username,
    }));
}


const Page = ({ params }: PagePops) => {
    const trainer = json.content.find(trainer => trainer.username === unslugify(params.username));
    if (!trainer) return notFound();
    const isUserTrainer = false;

    const pkmnCaught: any = [];
    const pkmnSeen: any = [];



    const handleDelete = async () => {
        // return await deleteTrainer(token);
    }
    
    const reformatedDate = new Date(trainer.createdDate).toLocaleDateString();
    const voiceText = `
        This is the page of the ${trainer.trainerName} trainer.
        He belongs to the ${trainer.username} user and was created on ${reformatedDate}. 
        He has caught ${trainer?.pkmnCaught?.length ?? 0} pokemons and has also seen ${trainer.pkmnSeen?.length ?? 0} pokemons.
    `;

    const { trainerName, imgUrl } = trainer
    return (
        <main className={styles.main}>
            <nav className={styles.banner}> 
                <div className={styles.buttons}>
                    <ButtonGoBack href="/trainers" />
                    <PokedexVoiceSpeak text={voiceText} />
                </div>
                { isUserTrainer && 
                    <div className={styles.methods}>
                        <PokedexDelete 
                            entityName="Trainer"
                            deleteFunction={handleDelete} 
                            redirectToUrl="/trainers" 
                            refreshTagName={`trainer-${params.username}`}
                            successMessage="Your trainer is succesfully deleted" 
                        />
                        <Button renderAs="link" href={`/pokemons/`}>Mark</Button>
                        <Button renderAs="link" href={`/trainers/${params.username}/edit`}>Edit</Button>
                    </div> 
                }
            </nav>
            <div className={styles.gridContainer}>
                <div className={styles.imgContainer}>
                    <StyledImage fill={true} alt={trainerName} src={imgUrl} className={styles.img}/>
                </div>
                <div className={styles.sections}>
                    <section>
                        <h1>{trainerName}</h1>
                        <div>
                            <p><time>Created at: {reformatedDate}</time></p>
                            <p>Username: {trainer.username}</p>
                            <p>Pokemons Caught: {trainer?.pkmnCaught?.length ?? 0}</p>
                            <p>Pokemons Seen: {trainer.pkmnSeen?.length ?? 0}</p>
                        </div>
                    </section>
                    {/* {pkmnCaught && pkmnCaught.length > 0 &&
                        <section>
                            <h2>Caught Pokemons</h2>
                            <ul className={styles.wrapper}>
                                {pkmnCaught.map(({ id, name, imgUrl, types }) => (
                                    <li key={id}>
                                        <PokedexCard 
                                            key={id}
                                            image={imgUrl}
                                            name={name}
                                            url={`/pokemons/${slugify(name)}`}
                                            skeleton={false}
                                            isList={true}
                                            smaller={true}
                                            types={types}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>

                    }
                    {pkmnSeen && pkmnSeen.length > 0 &&
                        <section>
                            <h2>Seen Pokemons</h2>
                            <ul className={styles.wrapper}>
                                {pkmnSeen.map(({id, name, imgUrl, types}) => (
                                    <li key={id}>
                                        <PokedexCard 
                                            key={id}
                                            image={imgUrl}
                                            name={name}
                                            url={`/pokemons/${slugify(name)}`}
                                            skeleton={false}
                                            isList={true}
                                            smaller={true}
                                            types={types}
                                            
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    } */}
                </div>
            </div>
        </main>
    );
}

export default Page;
