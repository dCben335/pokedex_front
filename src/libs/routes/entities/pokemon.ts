import { UrlParams } from '@/utils/queryParams';
import { pokemonSearchResponseSchema, pokemonTypeResponseSchema, pokemonSchema, PokemonPostRequest, PokemonPutRequest } from "@/libs/schemas/entities/pokemon";
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


//POST /
export const createPokemon = async (pokemon: PokemonPostRequest, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}`,
        method: "POST",
        token: token,
        body: JSON.stringify(pokemon)
    });

    return data;
}

export const updatePokemon = async (pokemon: PokemonPutRequest, token: string) => {
    if (!pokemon.id) throw new Error("Pokemon id is required");
    
    const UrlParams = new URLSearchParams();
    UrlParams.append("id", pokemon.id);
    if (pokemon.name) UrlParams.append("name", pokemon.name);
    if (pokemon.description) UrlParams.append("description", pokemon.description);
    if (pokemon.typeOne) UrlParams.append("typeOne", pokemon.typeOne);
    if (pokemon.typeTwo) UrlParams.append("typeTwo", pokemon.typeTwo);
    if (pokemon.imgUrl) UrlParams.append("imgUrl", pokemon.imgUrl);
    console.log(UrlParams.toString(), pokemon);

    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}?${UrlParams.toString()}`,
        method: "PUT",
        token: token,
    });

    return data;
}

export const deletePokemon = async (pokemonName: string, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}`,
        method: "DELETE",
        token: token
    });

    return data;
}

//POST region 
export const createPokemonRegion = async (region: string, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/region`,
        method: "POST",
        token: token, 
        body: JSON.stringify({ region })
    });

    return data;
}