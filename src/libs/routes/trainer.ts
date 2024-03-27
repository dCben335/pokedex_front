import { TrainerRequest } from "@/libs/zod/trainer";
import { NEXT_PUBLIC_BASE_API_URL } from "./user"



//GET /trainer 
export const getTrainers = async (urlParams: string) => {
    try {
        const url = `${NEXT_PUBLIC_BASE_API_URL}/trainer/search?${urlParams}`
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching trainers");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching trainers");
    }
}


//GET /trainer/:username
export const getTrainer = async (username: string) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer/${username}`);

        if (!response.ok) {
            throw new Error("Error fetching trainer");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching trainer");
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
export const createTrainer = async (options: TrainerRequest) => {
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
export const updateTrainer = async (options: TrainerRequest) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer?${options}`, {
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
export const createTrainerMark = async (options: string) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/trainer/mark?${options}`, {
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


