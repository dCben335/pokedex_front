import { useQuery } from "@tanstack/react-query";

const useGetPokemon = (name: string) => {
    const pokemons = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => {}
    });


    return pokemons;
}

export default useGetPokemon;