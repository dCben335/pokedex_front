import { z } from "zod";

export type TrainerOptions = z.infer<typeof TrainerOptionsSchema>;
export const TrainerOptionsSchema = z.object({
    trainerName: z.string().optional(),
    imgUrl: z.string().optional(),
});

export type TrainerMarkOptions = z.infer<typeof TrainerMarkOptionsSchema>;
export const TrainerMarkOptionsSchema = z.object({
    pkmnId: z.string(),
    isCaught: z.boolean(),
});

