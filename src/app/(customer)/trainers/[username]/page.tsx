import Button from "@/components/ui/Button/Button";
import { getTrainer } from "@/libs/routes/entities/trainer";
import { notFound } from "next/navigation";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import { getCookies, isCurrentUserTrainer } from "@/actions/cookies";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import styles from "./page.module.scss";

interface PagePops {
    params: {
        username: string;
    };
}

const Page = async({ params }: PagePops) => {
    const trainer  = await getTrainer(params.username);
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


    const { trainerName, imgUrl } = trainer
    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href="/trainers">Trainers</ButtonGoBack>
                { isUserTrainer && <Button renderAs="link" href={`/trainers/${params.username}/edit`}>Edit</Button> }
            </nav>
            

            <h1>{trainerName}</h1>
            <img src={imgUrl} alt={trainerName} />
        </main>
    );
}

export default Page;
