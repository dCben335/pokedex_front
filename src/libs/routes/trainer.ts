import { TrainerOptions } from "@/libs/zod/trainer";
import { NEXT_PUBLIC_BASE_API_URL } from "./user"



//GET /trainer 
export const getTrainer = async () => {
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


