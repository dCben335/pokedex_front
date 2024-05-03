import { z } from "zod";
import { pageableSchema, portSchema } from "../pageable";
import { userSchema } from "./user";


export type TrainerMarkRequest = z.infer<typeof trainerMarkRequestSchema>;
export const trainerMarkRequestSchema = z.object({
    pkmnId: z.string(),
    isCaught: z.boolean(),
});

export type Trainer = z.infer<typeof trainerSchema>;
export const trainerSchema = z.object({
    createdDate: z.string(),
    id: z.string(),
    username: userSchema.shape.login,
    trainerName: z.string().regex(/^[a-zA-Z0-9 -]+$/, { message: "Only letters, numbers, spaces and hyphens are allowed" }),
    imgUrl: z.string().url(),
    pkmnSeen: z.array(trainerMarkRequestSchema.shape.pkmnId).optional(),
    pkmnCaught: z.array(trainerMarkRequestSchema.shape.pkmnId).optional(),
});

export type TrainerRequest = z.infer<typeof trainerRequestSchema>;
export const trainerRequestSchema = z.object({
    trainerName: trainerSchema.shape.trainerName,
    imgUrl: trainerSchema.shape.imgUrl,
});



export type TrainerSearchResponse = z.infer<typeof trainerSearchResponseSchema>;
export const trainerSearchResponseSchema = z.object({
    content: z.array(trainerSchema),
    empty: z.boolean(),
    first: z.boolean(),
    last: z.boolean(),
    number: z.number(),
    numberOfElements: z.number(),
    pageable: pageableSchema,
    size: z.number(),
    sort: portSchema,
    totalElements: z.number(),
    totalPages: z.number(),
});





