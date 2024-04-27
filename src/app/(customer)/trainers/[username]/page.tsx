"use server";

import Button from "@/components/ui/Button/Button";
import { getTrainer } from "@/libs/routes/entities/trainer";
import TrainerFallBack from "../../../../components/customs/Pokedex/Trainers/TrainerFallBack/TrainerFallBack";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = async({ params }: PagePops) => {
    const data  = await getTrainer(params.username)
    if ("error" in data || !data) {
        return <TrainerFallBack userName={params.username} />
    }

    const { trainerName, imgUrl } = data

    return (
        <main>
            <Button renderAs="link" href="/trainers">Back</Button>
            <Button renderAs="link" href={`/trainers/${params.username}/edit`}>Edit</Button>

            <h1>{data?.trainerName}</h1>
            <img src={data?.imgUrl} alt={data?.trainerName} />
            
        </main>
    );
}

export default Page;
