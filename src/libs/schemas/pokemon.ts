import { z } from "zod";
import { pageableSchema, portSchema } from "./pageable";

export type PokemonType = z.infer<typeof pokemonTypeSchema>;
export const pokemonTypeSchema = z.object({
    name: z.string(),
    color: z.string(),
});

export type PokemonTypeResponse = z.infer<typeof pokemonTypeResponseSchema>;
export const pokemonTypeResponseSchema = z.object({
    types: z.array(pokemonTypeSchema),
    count: z.number(),
});


export type PokemonRegion = z.infer<typeof pokemonRegionSchemp>;
export const pokemonRegionSchemp = z.object({
    regionName: z.string(),
    regionPokedexNumber: z.string(),
}); 


export type Pokemon = z.infer<typeof pokemonSchema>;
export const pokemonSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(255),
    imgUrl: z.string().min(1),
    description: z.string(),
    types: z.array(pokemonTypeSchema.shape.name).min(0).max(2),
    regions: z.array(pokemonRegionSchemp).min(0),
});


export type PokemonSearchResponse = z.infer<typeof pokemonSearchResponseSchema>;
export const pokemonSearchResponseSchema = z.object({
    content: z.array(pokemonSchema),
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