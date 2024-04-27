import { useQuery } from "@tanstack/react-query"
import { getPokemons } from "../../libs/routes/entities/pokemon"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUrlParams, UrlParams } from "@/utils/queryParams";

const usePokemons = () => {
    const searchParams = useSearchParams()
    const [urlParams, setUrlParams] = useState<UrlParams>({})

    const pokemons = useQuery({
        queryKey: ["pokemons", urlParams],
        queryFn: () => getPokemons(getUrlParams(urlParams))
    });

    useEffect(() => {
        setUrlParams(Object.fromEntries(searchParams.entries()))
    }, [searchParams]);

    return pokemons;
}

export default usePokemons;