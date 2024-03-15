import { z } from "zod";
import { PageableSchema, SortSchema } from "./pageable";

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


export type PokemonSearch = z.infer<typeof pokemonSearchSchema>;
export const pokemonSearchSchema = z.object({
    content: z.array(pokemonSchema),
    pageable: PageableSchema,
    last: z.boolean(),
    totalPages: z.number(),
    totalElements: z.number(),
    numberOfElements: z.number(),
    size: z.number(),
    number: z.number(),
    sort: SortSchema,
    first: z.boolean(),
    empty: z.boolean(),
});