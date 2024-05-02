import Button from "@/components/ui/Button/Button";
import { deleteTrainer, getTrainer } from "@/libs/routes/entities/trainer";
import { notFound } from "next/navigation";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import { getCookies, isCurrentUserTrainer } from "@/actions/cookies";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import styles from "./page.module.scss";
import { unslugify } from "@/utils/reformat";
import PokedexDelete from "@/components/customs/Pokedex/PokedexDelete/PokedexDelete";

interface PagePops {
    params: {
        username: string;
    };
}

const Page = async({ params }: PagePops) => {
    const trainer = await getTrainer(unslugify(params.username));

    const { login, token } = await getCookies();
    const isUserTrainer = await isCurrentUserTrainer(login, token, params.username);
    
    if ("error" in trainer) {
        if (!isUserTrainer) return notFound();

        return (
            <main className="centered-page-content">
                <TrainerForm token={token} username={login}/>
            </main>
        )
    }

    const handleDelete = async () => {
        "use server"
        return await deleteTrainer(token);
    }

    const { trainerName, imgUrl } = trainer
    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href="/trainers">Trainers</ButtonGoBack>
                { isUserTrainer && 
                    <div>
                        <PokedexDelete 
                            entityName="Trainer"
                            deleteFunction={handleDelete} 
                            redirectToUrl="/trainers" 
                            refreshTagName={`trainer-${params.username}`}
                            successMessage="Your trainer is succesfully deleted" 
                        />
                        <Button renderAs="link" href={`/trainers/${params.username}/edit`}>Edit</Button>
                    </div> 
                }

                
            </nav>

            <h1>{trainerName}</h1>
            <img src={imgUrl} alt={trainerName} />
        </main>
    );
}

export default Page;
