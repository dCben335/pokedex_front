import Button from "@/components/ui/Button/Button";
import { getTrainer } from "@/libs/routes/entities/trainer";
import {cookies} from "next/headers";
import { getUserInfoFromToken } from "@/libs/routes/entities/user";
import { notFound } from "next/navigation";
import TrainerForm from "@/components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import { getCookies } from "@/actions/cookies";


interface PagePops {
    params: {
        username: string;
    };
}

const Page = async({ params }: PagePops) => {
    const data  = await getTrainer(params.username)
    
    if ("error" in data) {
        const { login, token } = await getCookies();
        if (!token) return notFound();
        if (login !== params.username) return notFound();

        const user = await getUserInfoFromToken(token);
        if (user?.login !== login) return notFound()

        return (
            <main>
                <TrainerForm token={token} username={user?.login}/>
            </main>
        )
    }


    const { trainerName, imgUrl } = data
    return (
        <main>
            <Button renderAs="link" href="/trainers">Back</Button>
            <Button renderAs="link" href={`/trainers/${params.username}/edit`}>Edit</Button>

            <h1>{trainerName}</h1>
            <img src={imgUrl} alt={trainerName} />
            
        </main>
    );
}

export default Page;
