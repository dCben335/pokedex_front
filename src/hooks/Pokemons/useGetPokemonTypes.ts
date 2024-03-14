import { useQuery } from "@tanstack/react-query"
import { getPokemonTypes } from "../../routes/pokemon"


const useGetPokemonTypes = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons", "types"],
        queryFn: getPokemonTypes,
    });


    return pokemons;
}

export default useGetPokemonTypes;