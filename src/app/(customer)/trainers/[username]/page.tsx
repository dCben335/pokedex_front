"use client"

import { useUser } from "@/components/providers/UserContext";
import useTrainer from "@/hooks/Trainers/useTrainer";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import TrainerForm from "../_components/TrainerForm/TrainerForm";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = ({ params }: PagePops) => {
    const { user, token } = useUser();

    const { data, isLoading, error } = useTrainer(params.username)

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        if (!token || !user) {
            return notFound();
        }

        if (user?.login !== params.username) {
            toast.error(error.message);
            return notFound();
        }
        
        return (
            <main>
                <h1>Create your own trainer</h1>
                <TrainerForm token={token} defaultValues={{ 
                    trainerName: user.login,
                    imgUrl: "tedst",
                 }} />
            </main>
        )
    }

    return (
        <main>
            
        </main>
    );
}

export default Page;
