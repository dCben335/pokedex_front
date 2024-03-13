"use client";


const NEXT_PUBLIC_BASE_API_URL = "http://localhost:3000/api";


if (!NEXT_PUBLIC_BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_BASE_API_URL is not set");
}

//GET /pkmn/search
const getPokemons = async () => {
    try {
        // const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/search`);
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching pokemons");
    }
}


//GET /pkmn/types
const getPokemonTypes = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/pkmn/types`);
        return response.json();
    }
    catch (error) {
        throw new Error("Error fetching pokemon types");
    }
}



export {
    getPokemons,
    getPokemonTypes
}