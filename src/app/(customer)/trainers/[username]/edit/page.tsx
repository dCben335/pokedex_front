"use client"

import { useUser } from "@/components/providers/UserContext";
import useTrainer from "@/hooks/Trainers/useTrainer";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import TrainerForm from "../../_components/TrainerForm/TrainerForm";
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

    if (error || !token || user?.login !== params.username) {
        if (!token || user?.login !== params.username) {
            toast.error(error?.message ?? "You are not authorized to edit this trainer");
            return notFound();
        }
    }

    return (
        <main>
            <TrainerForm 
                username={params.username}
                editMode={true} 
                token={token} 
                defaultValues={{ 
                    trainerName: data?.trainerName, 
                    imgUrl: data?.imgUrl
                }}    
            />
        </main>
    );
}

export default Page;
