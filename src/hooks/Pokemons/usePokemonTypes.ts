import { useQuery } from "@tanstack/react-query"
import { getPokemonTypes } from "../../libs/routes/pokemon"


const usePokemonTypes = () => {
    const pokemons = useQuery({
        queryKey: ["pokemons", "types"],
        queryFn: getPokemonTypes,
    });


    return pokemons;
}

export default usePokemonTypes;