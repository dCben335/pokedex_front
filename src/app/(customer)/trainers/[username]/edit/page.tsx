import { getCookies, isCurrentUserTrainer } from "@/actions/cookies";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import { getTrainer } from "@/libs/routes/entities/trainer";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        username: string;
    };
}

const Page = async({ params }: PageProps) => {
    const trainer  = await getTrainer(params.username);
    if ("error" in trainer) return notFound();

    const { login, token } = await getCookies();
    if (!isCurrentUserTrainer(login,token, params.username)) return notFound();

    return (
        <main className="centered-page-content">
            <TrainerForm 
                token={token} 
                username={login} 
                editMode={true}
                defaultValues={{
                    trainerName: trainer.trainerName,
                    imgUrl: trainer.imgUrl,
                }}
            />
        </main>
    );
}

export default Page;
