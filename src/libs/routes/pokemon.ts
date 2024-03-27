import { PokemonSchema, PokemonSearchResponseSchema, PokemonTypeResponseSchema } from "@/libs/zod/pokemon";
import { NEXT_PUBLIC_BASE_API_URL } from "./user"


//GET /pkmn/search
export const getPokemons = async (urlParams: string) => {
    try {
        const url = `${NEXT_PUBLIC_BASE_API_URL}/pkmn/search?${urlParams}`
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Error fetching pokemons");
        }

        const data = await response.json();

        return PokemonSearchResponseSchema.parse(data);
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}


//GET /pkmn
export const getPokemon = async (name: string) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn?name=${name}`);

        if (!response.ok) {
            throw new Error("Error fetching pokemon");
        }

        const data = await response.json();
        return PokemonSchema.parse(data);
    }
    catch (error) {
        throw new Error("Error fetching pokemon");
    }
}


//GET /pkmn/types
export const getPokemonTypes = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/types`);

        if (!response.ok) {
            throw new Error("Error fetching pokemon types");
        }
        
        const data = await response.json();
        
        return PokemonTypeResponseSchema.parse(data);;
    }
    catch (error) {
        throw new Error("Error fetching pokemon types");
    }
}



//POST /pkmn/region 
export const createPokemonRegion = async (region: string) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/region`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ region })
        });

        if (!response.ok) {
            throw new Error("Error fetching pokemon by region");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching pokemon by region");
    }
}