import { useQuery } from "@tanstack/react-query"
import { getPokemons } from "../routes/pokemons"


const useGetPokemons = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons"],
        queryFn: getPokemons
    });


    return pokemons;
}

export default useGetPokemons;