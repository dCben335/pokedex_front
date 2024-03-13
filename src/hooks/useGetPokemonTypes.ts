import { useQuery } from "@tanstack/react-query"
import { getPokemonTypes } from "../routes/pokemons"


const useGetPokemons = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons"],
        queryFn: getPokemonTypes
    });


    return pokemons;
}

export default useGetPokemons;