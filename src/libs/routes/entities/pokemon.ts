import { UrlParams } from '@/utils/queryParams';
import { pokemonSearchResponseSchema, pokemonTypeResponseSchema, pokemonSchema, PokemonPostRequest, PokemonPutRequest, PokemonRegionRequest } from "@/libs/schemas/entities/pokemon";
import { handleApiFetch } from "../";
import { parseWithZodSchema } from "@/utils/parse";
import { slugify } from '@/utils/reformat';

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
        tags: [`pokemon-${slugify(name)}`]
    });
    if ("error" in data) return data as { error: string };

    return parseWithZodSchema(pokemonSchema, data);
}


//POST /
export const createPokemon = async (pokemon: PokemonPostRequest, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}`,
        method: "POST",
        token: token,
        body: JSON.stringify({...pokemon}),
        tags: [`pokemon-${slugify(pokemon.name)}`],
        notJsonResponse: true
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

    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}?${UrlParams.toString()}`,
        method: "PUT",
        token: token,
        tags: [`pokemon-${slugify(pokemon.name)}`]
    });

    return data;
}

export const deletePokemon = async (pokemonName: string, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}?name=${pokemonName}`,
        method: "DELETE",
        token: token,
        notJsonResponse: true,
    });
    
    return data;
}

//POST region 
export const createPokemonRegion = async (body: PokemonRegionRequest, token: string) => {
    const finalBody = {
        name: body.name,
        region: {
            regionName: body.region.regionName,
            regionPokedexNumber: body.region.regionPokedexNumber.toString()
        }
    };
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/region`,
        method: "POST",
        token: token, 
        body: JSON.stringify(finalBody),
    });


    return data;
}

//DELETE region
export const deletePokemonRegion = async (pokemonId: string, regionName: string, token: string) => {
    const data = await handleApiFetch({
        path: `${API_POKEMON_BASE_URL}/region?id=${pokemonId}&regionName=${regionName}`,
        method: "DELETE",
        token: token,
        notJsonResponse: true,
    });
    
    return data;
}