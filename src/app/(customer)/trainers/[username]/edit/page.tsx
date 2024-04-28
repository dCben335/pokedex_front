import { getCookies } from "@/actions/cookies";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import { getTrainer } from "@/libs/routes/entities/trainer";
import { getUserInfoFromToken } from "@/libs/routes/entities/user";
import { notFound } from "next/navigation";


interface PageProps {
    params: {
        username: string;
    };
}


const Page = async({ params }: PageProps) => {
    const { login, token } = await getCookies();
    
    if (!token) return notFound();
    if (login !== params.username) return notFound();

    const user = await getUserInfoFromToken(token);
    if (user?.login !== login) return notFound()


    const trainer = await getTrainer(params.username)
    if ("error" in trainer) return notFound();
    if (!trainer) return notFound();

    const defaultValues = {
        trainerName: trainer.trainerName,
        imgUrl: trainer.imgUrl,
    }
    
    return (
        <main>
            <TrainerForm 
                token={token} 
                username={user?.login} 
                editMode={true}
                defaultValues={defaultValues}
            />
        </main>
    );
}

export default Page;
