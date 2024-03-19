import { getPokemon } from "@/routes/pokemon";
import { useQuery } from "@tanstack/react-query";

const useGetPokemon = (name: string) => {
    const pokemons = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => getPokemon(name)
    });

    return pokemons;
}

export default useGetPokemon;