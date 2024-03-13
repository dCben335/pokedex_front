import { setUrlParams, urlParams } from "@/utils/fetchOptions";
import { NEXT_PUBLIC_BASE_API_URL } from "./user"

if (!NEXT_PUBLIC_BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_BASE_API_URL is not set");
}



type TrainerOptions = {
    trainerName?: string;
    imgUrl?: string;
}

type TrainerMarkOptions = {
    pkmnId: string;
    isCaught: boolean;
}



//GET /trainer 
export const getTrainers = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer`);

        if (!response.ok) {
            throw new Error("Error fetching trainers");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching trainers");
    }
}



//DELETE /trainer
export const deleteTrainer = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error deleting trainer");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error deleting trainer");
    }
}
    


//POST /trainer
export const createTrainer = async (options: TrainerOptions) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer`, {
            method: "POST",
            body: JSON.stringify(options),
        });

        if (!response.ok) {
            throw new Error("Error creating trainer");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error creating trainer");
    }
}



//PUT /trainer
export const updateTrainer = async (options: TrainerOptions) => {
    try {
        const urlOptions = setUrlParams(options)
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer?${urlOptions}`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Error updating trainer");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error updating trainer");
    }
}






//POST /trainer/mark
export const createTrainerMark = async (options: TrainerMarkOptions) => {
    try {
        const urlOptions = setUrlParams(options)
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer/mark?${urlOptions}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Error updating trainer");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error updating trainer");
    }
}


