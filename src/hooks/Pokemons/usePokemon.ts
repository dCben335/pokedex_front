import { getPokemon } from "@/libs/routes/pokemon";
import { useQuery } from "@tanstack/react-query";

const usePokemon = (name: string) => {
    const pokemons = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => getPokemon(name)
    });

    return pokemons;
}

export default usePokemon;