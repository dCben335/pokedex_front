"use client"

import { useUser } from "@/components/providers/UserContext";
import TestForm from "../_components/TestForm";
import useTrainer from "@/hooks/Trainers/useTrainer";
import { notFound } from "next/navigation";
import { toast } from "sonner";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = ({ params }: PagePops) => {
    const { user } = useUser();

    const { data, isLoading, error } = useTrainer(params.username)

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        if (user?.login !== params.username) {
            toast.error(error.message);
            return notFound();
        }
        return (
            <main>
                <h1>Create your own trainer</h1>
            </main>
        )
    }

    return (
        <main>
            
        </main>
    );
}

export default Page;
