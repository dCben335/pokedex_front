import { getPokemons } from "@/routes/pokemon";
import { useQuery } from "@tanstack/react-query";

const useGetPokemon = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons"],
        queryFn: getPokemons
    });


    return pokemons;
}

export default useGetPokemon;