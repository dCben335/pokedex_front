import { getPokemons } from "@/routes/pokemon";
import { useQuery } from "@tanstack/react-query";

const useGetPokemon = (name: string) => {
    const pokemons = useQuery({
        queryKey: ["pokemon", name],
        queryFn: getPokemons
    });


    return pokemons;
}

export default useGetPokemon;