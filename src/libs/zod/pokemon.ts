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


export type PokemonRegion = z.infer<typeof pokemonRegion>;
export const pokemonRegion = z.object({
    regionName: z.string(),
    regionPokedexNumber: z.string(),
}); 


export type Pokemon = z.infer<typeof pokemonSchema>;
export const pokemonSchema = z.object({
    id: z.string(),
    name: z.string(),
    imgUrl: z.string(),
    description: z.string(),
    types: z.array(z.string()).min(0).max(2),
    regions: z.array(pokemonRegion).min(0),
});


export type PokemonSearch = z.infer<typeof pokemonSearchSchema>;
export const pokemonSearchSchema = z.object({
    content: z.array(pokemonSchema),
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