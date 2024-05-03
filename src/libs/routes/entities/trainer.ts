import { parseWithZodSchema } from '@/utils/parse';
import { Trainer, trainerSchema, trainerSearchResponseSchema } from '../../schemas/entities/trainer';
import { TrainerRequest } from "@/libs/schemas/entities/trainer";
import { handleApiFetch } from '..';
import { slugify } from '@/utils/reformat';

const API_TRAINER_BASE_URL = `trainer`;

//GET /search? 
export const getTrainers = async (urlParams: string) => {
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}/search?${urlParams}`,
        method: "GET",
    });

    console.log(data);
    const parsedData = parseWithZodSchema(trainerSearchResponseSchema, data);
    if ("error" in parsedData) throw new Error(parsedData.error);
    return parsedData;
}


//GET /?username
export const getTrainer = async (username: string) => {
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}?username=${username}`,
        method: "GET",
        tags: [`trainer-${slugify(username)}`]
    });
    if ("error" in data) return data

    return parseWithZodSchema(trainerSchema, data);
}



//DELETE /
export const deleteTrainer = async (token: string) => {
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}`,
        method: "DELETE",
        token: token,
        notJsonResponse: true
    });

    return data;
}
    


//POST /
export const createTrainer = async (options: TrainerRequest, token: string) => {
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}`,
        method: "POST",
        body: JSON.stringify(options),
        token: token,
    });

    if ("error" in data) return data
    return parseWithZodSchema(trainerSchema, data);
}



//PUT /
export const updateTrainer = async (options: TrainerRequest, token: string) => {
    const suffix = (options.trainerName ? `trainerName=${options.trainerName}&` : '') + (options.imgUrl ? `imgUrl=${options.imgUrl}` : '');
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}?${suffix}`,
        method: "PUT",
        token: token,
    });

    if ("error" in data) return data
    return parseWithZodSchema(trainerSchema, data);
}



//POST /mark
export const createTrainerMark = async (pkmnId: string, isCaught: boolean, token: string) => {
    const data = await handleApiFetch({
        path: `${API_TRAINER_BASE_URL}/mark?pkmnId=${pkmnId}&isCaught=${isCaught}`,
        method: "POST",
        token: token,
    });

    return data;
}


