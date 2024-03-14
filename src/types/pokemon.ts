import { z } from "zod";

export type PokemonType = z.infer<typeof pokemonTypeSchema>;
export const pokemonTypeSchema = z.object({
    name: z.string(),
    color: z.string(),
});

export type PokemonTypeRequest = z.infer<typeof pokemonTypeRequestSchema>;
export const pokemonTypeRequestSchema = z.object({
    types: z.array(pokemonTypeSchema),
    count: z.number(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
export const pokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    imgUrl: z.string(),
    types: z.array(z.string()).min(0).max(2),
});




