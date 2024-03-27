import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUrlParams, urlParams } from "@/utils/queryParams";
import { getTrainers } from "@/libs/routes/trainer";

const useTrainers = () => {
    const searchParams = useSearchParams()
    const [urlParams, setUrlParams] = useState<urlParams>({})

    const trainers = useQuery({
        queryKey: ["trainers", urlParams],
        queryFn: () => getTrainers(getUrlParams(urlParams))
    });

    useEffect(() => {
        setUrlParams(Object.fromEntries(searchParams.entries()))
    }, [searchParams]);

    
    return trainers;
}

export default useTrainers;