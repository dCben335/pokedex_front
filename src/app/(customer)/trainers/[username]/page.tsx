"use client"

import { useUser } from "@/components/providers/UserContext";
import useTrainer from "@/hooks/Trainers/useTrainer";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import TrainerForm from "../_components/TrainerForm/TrainerForm";
import Button from "@/components/ui/Button/Button";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = ({ params }: PagePops) => {
    const { data, isLoading, error } = useTrainer(params.username)
    
    const { user, token } = useUser();
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        if (!token || user?.login !== params.username) {
            toast.error(error.message);
            return notFound();
        }
        
        return (
            <main>
                <h1>Create your own trainer</h1>
                <TrainerForm
                    username={params.username}
                    token={token} 
                />
            </main>
        )
    }

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
