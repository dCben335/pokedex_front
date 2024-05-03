import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import ButtonGoBack from "@/components/ui/ButtonGoBack/ButtonGoBack";
import { getTrainer } from "@/libs/routes/entities/trainer";
import { unslugify } from "@/utils/reformat";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import trainerJson from "@/contents/trainers.json";
import { TrainerSearchResponse } from "@/libs/schemas/entities/trainer";

const json = trainerJson as TrainerSearchResponse;
interface PageProps {
    params: {
        username: string;
    };
}

export async function generateStaticParams() {    
    return json.content.map((trainer) => ({
        username: trainer.username,
    }));
}

const Page = ({ params }: PageProps) => {
    const trainer = json.content.find(trainer => trainer.username === unslugify(params.username));
    if (!trainer) return notFound();

    return (
        <main>
            <nav className={styles.banner}> 
                <ButtonGoBack href={`/trainers/${params.username}`} />
            </nav>
            <div className="centered-page-content">
                {/* <TrainerForm 
                    token={token} 
                    username={login} 
                    editMode={true}
                    defaultValues={{
                        trainerName: trainer.trainerName,
                        imgUrl: trainer.imgUrl,
                    }}
                /> */}
            </div>
        </main>
    );
}

export default Page;
