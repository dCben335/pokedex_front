import { z } from "zod";
import { PageableSchema, SortSchema } from "./pageable";

export type PokemonType = z.infer<typeof pokemonTypeSchema>;
export const pokemonTypeSchema = z.object({
    name: z.string(),
    color: z.string(),
});

export type PokemonTypeResponse = z.infer<typeof PokemonTypeResponseSchema>;
export const PokemonTypeResponseSchema = z.object({
    types: z.array(pokemonTypeSchema),
    count: z.number(),
});


export type PokemonRegion = z.infer<typeof PokemonRegionSchema>;
export const PokemonRegionSchema = z.object({
    regionName: z.string(),
    regionPokedexNumber: z.string(),
}); 


export type Pokemon = z.infer<typeof PokemonSchema>;
export const PokemonSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(255),
    imgUrl: z.string().min(1),
    description: z.string(),
    types: z.array(pokemonTypeSchema.shape.name).min(0).max(2),
    regions: z.array(PokemonRegionSchema).min(0),
});


export type PokemonSearchResponse = z.infer<typeof PokemonSearchResponseSchema>;
export const PokemonSearchResponseSchema = z.object({
    content: z.array(PokemonSchema),
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