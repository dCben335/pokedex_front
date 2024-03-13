import { NEXT_PUBLIC_BASE_API_URL } from "./user"

if (!NEXT_PUBLIC_BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_BASE_API_URL is not set");
}

//GET /pkmn/search
export const getPokemons = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/search`);
        // const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");

        if (!response.ok) {
            throw new Error("Error fetching pokemons");
        }

        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching pokemons");
    }
}


//GET /pkmn/types
export const getPokemonTypes = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/types`);

        if (!response.ok) {
            throw new Error("Error fetching pokemon types");
        }
        
        return response.json();
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