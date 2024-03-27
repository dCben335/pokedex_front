import { z } from "zod";
import { PageableSchema, SortSchema } from "./pageable";
import { UserSchema } from "./user";


export type TrainerMarkRequest = z.infer<typeof TrainerMarkRequestSchema>;
export const TrainerMarkRequestSchema = z.object({
    pkmnId: z.string(),
    isCaught: z.boolean(),
});

export type Trainer = z.infer<typeof TrainerSchema>;
export const TrainerSchema = z.object({
    createdDate: z.string(),
    id: z.string(),
    username: UserSchema.shape.login,
    trainerName: z.string(),
    imgUrl: z.string(),
    pkmnSeen: z.array(TrainerMarkRequestSchema.shape.pkmnId).optional(),
    caughtPokemons: z.array(TrainerMarkRequestSchema.shape.pkmnId).optional(),
});

export type TrainerRequest = z.infer<typeof TrainerRequestSchema>;
export const TrainerRequestSchema = z.object({
    trainerName: TrainerSchema.shape.trainerName,
    imgUrl: TrainerSchema.shape.imgUrl,
});



export type TrainerSearchResponse = z.infer<typeof TrainerSearchResponseSchema>;
export const TrainerSearchResponseSchema = z.object({
    content: z.array(TrainerSchema),
    empty: z.boolean(),
    first: z.boolean(),
    last: z.boolean(),
    number: z.number(),
    numberOfElements: z.number(),
    pageable: PageableSchema,
    size: z.number(),
    sort: SortSchema,
    totalElements: z.number(),
    totalPages: z.number(),
});





