import { useUser } from "@/components/providers/UserContext";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import TrainerForm from "../../../../../components/customs/Pokedex/Trainers/TrainerForm/TrainerForm";
import Button from "@/components/ui/Button/Button";
import TrainerFallBack from "@/components/customs/Pokedex/Trainers/TrainerFallBack/TrainerFallBack";
import { getTrainer } from "@/libs/routes/entities/trainer";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = async({ params }: PagePops) => {
    const data  = await getTrainer(params.username)
    if ("error" in data || !data) {
        return <TrainerFallBack userName={params.username} editMode={true} />
    }

    const { trainerName, imgUrl } = data

    return (
        <main>
            Train
        </main>
    );
}

export default Page;
