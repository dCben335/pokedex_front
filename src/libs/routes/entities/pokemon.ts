import { pokemonSearchResponseSchema, pokemonTypeResponseSchema, pokemonSchema } from "@/libs/schemas/pokemon";
import { handleApiFetch } from "../";
import { parseWithZodSchema } from "@/utils/parse";

const API_POKEMON_BASE_URL = `pkmn`;


//GET /types
export const getPokemonTypes = async () => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/types`,
        method: "GET",
    });

    if ("error" in data) throw new Error(data.error);

    const parsedData = parseWithZodSchema(pokemonTypeResponseSchema, data);
    if ("error" in parsedData) throw new Error(parsedData.error);
    return parsedData;
}

//GET /search
export const getPokemons = async (urlParams: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/search?${urlParams}`,
        method: "GET",
    });
    if ("error" in data) throw new Error(data.error);
    
    const parsedData = parseWithZodSchema(pokemonSearchResponseSchema, data);
    if ("error" in parsedData) throw new Error(parsedData.error);
    return parsedData;
}



//GET ?name=
export const getPokemon = async (name: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}?name=${name}`,
        method: "GET",
    });

    return parseWithZodSchema(pokemonSchema, data);
}


//POST region 
export const createPokemonRegion = async (region: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/region`,
        method: "POST",
        body: JSON.stringify({ region })
    });

    return data;
}