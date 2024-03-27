import { z } from "zod";

export type TrainerRequest = z.infer<typeof TrainerRequestSchema>;
export const TrainerRequestSchema = z.object({
    trainerName: z.string().optional(),
    imgUrl: z.string().optional(),
});

export type TrainerMarkRequest = z.infer<typeof TrainerMarkRequestSchema>;
export const TrainerMarkRequestSchema = z.object({
    pkmnId: z.string(),
    isCaught: z.boolean(),
});

export type Trainer = z.infer<typeof TrainerSchema>;
export const TrainerSchema = z.object({
    trainerName: z.string(),
    imgUrl: z.string(),
    pokemons: z.array(z.string()),
    caughtPokemons: z.array(z.string()),
});



