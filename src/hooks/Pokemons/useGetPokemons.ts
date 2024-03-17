import { useQuery } from "@tanstack/react-query"
import { getPokemons } from "../../routes/pokemon"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUrlParams, urlParams } from "@/utils/queryParams";

const useGetPokemons = () => {
    const [urlParams, setUrlParams] = useState<urlParams>({})
    const searchParams = useSearchParams()

    const pokemons = useQuery({
        queryKey: ["pokemons", urlParams],
        queryFn: () => getPokemons(getUrlParams(urlParams))
    });

    useEffect(() => {
        setUrlParams(Object.fromEntries(searchParams.entries()))
    }, [searchParams]);

    return pokemons;
}

export default useGetPokemons;