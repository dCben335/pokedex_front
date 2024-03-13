import { useQuery } from "@tanstack/react-query"
import { getPokemons } from "../../routes/pokemon"


const useGetPokemons = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons"],
        queryFn: getPokemons
    });


    return pokemons;
}

export default useGetPokemons;