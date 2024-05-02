import { getCookies, isCurrentUserTrainer } from "@/actions/cookies";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import { getTrainer, getTrainers } from "@/libs/routes/entities/trainer";
import { unslugify } from "@/utils/reformat";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

interface PageProps {
    params: {
        username: string;
    };
}


export async function generateStaticParams() {
    const fakeTrainers = [
        {
            username: "ash",
            trainerName: "Ash Ketchum",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png",
        },
        {
            username: "misty",
            trainerName: "Misty",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/2.png",
        },
        {
            username: "brock",
            trainerName: "Brock",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/3.png",
        },
    ];
    
    return fakeTrainers.map((trainer) => ({
        username: trainer.username,
    }));
}


const Page = async({ params }: PageProps) => {
    const sluggifiedUsername = unslugify(params.username);
    const trainer = await getTrainer(sluggifiedUsername);
    if ("error" in trainer) return notFound();

    const { login, token } = await getCookies();
    if (!isCurrentUserTrainer(login,token, params.username)) return notFound();

    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href={`/trainers/${sluggifiedUsername}`}>Trainers</ButtonGoBack>
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
