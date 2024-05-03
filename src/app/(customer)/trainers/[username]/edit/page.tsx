import { getCookies, isCurrentUserTrainer } from "@/actions/cookies";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import { getTrainer } from "@/libs/routes/entities/trainer";
import { unslugify } from "@/utils/reformat";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

interface PageProps {
    params: {
        username: string;
    };
}

const Page = async({ params }: PageProps) => {
    const trainer = await getTrainer(unslugify(params.username));
    if ("error" in trainer) return notFound();

    const { login, token } = await getCookies();
    if (!isCurrentUserTrainer(login,token, params.username)) return notFound();

    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href={`/trainers/${params.username}`}>Trainers</ButtonGoBack>
            </nav>
            <div className="centered-page-content">
                <TrainerForm 
                    token={token} 
                    username={login} 
                    editMode={true}
                    defaultValues={{
                        trainerName: trainer.trainerName,
                        imgUrl: trainer.imgUrl,
                    }}
                />
            </div>
        </main>
    );
}

export default Page;
