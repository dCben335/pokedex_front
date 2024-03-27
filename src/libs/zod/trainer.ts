import { z } from "zod";


export type TrainerMarkRequest = z.infer<typeof TrainerMarkRequestSchema>;
export const TrainerMarkRequestSchema = z.object({
    pkmnId: z.string(),
    isCaught: z.boolean(),
});

export type Trainer = z.infer<typeof TrainerSchema>;
export const TrainerSchema = z.object({
    trainerName: z.string(),
    imgUrl: z.string(),
    pokemons: z.array(TrainerMarkRequestSchema.shape.pkmnId),
    caughtPokemons: z.array(z.string()),
});

export type TrainerRequest = z.infer<typeof TrainerRequestSchema>;
export const TrainerRequestSchema = z.object({
    trainerName: TrainerSchema.shape.trainerName,
    imgUrl: TrainerSchema.shape.imgUrl,
});







