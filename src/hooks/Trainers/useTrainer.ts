import { getTrainer } from "@/libs/routes/trainer";
import { useQuery } from "@tanstack/react-query";

const useTrainer = (username: string) => {
    const trainer = useQuery({
        queryKey: ["pokemon", username],
        queryFn: () => getTrainer(username)
    });

    return trainer;
}

export default useTrainer;