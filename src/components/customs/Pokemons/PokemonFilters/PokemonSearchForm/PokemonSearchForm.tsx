"use client";

import GroupForm from "@/components/ui/GroupForm/GroupForm"
import { createQueryString, removeQueryString } from "@/utils/queryParams"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, HTMLAttributes, Suspense, use, useEffect, useState } from "react"

type PokemonSearchFormProps = HTMLAttributes<HTMLFormElement>

const PokemonSearchForm = ({className, ...props}: PokemonSearchFormProps) => {
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const defaultValue = searchParams.get('partialName') ?? "";

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (inputValue === undefined) return;
        
        const timeout = setTimeout(() => {
            if (searchParams.get('partialName') === inputValue) return
            const updatedSearchParams = removeQueryString(searchParams, 'page');
            router.push(`${pathname}?${createQueryString(updatedSearchParams, 'partialName', inputValue)}`);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [inputValue, router, pathname, searchParams]);


    return (
        <form {...props} className={`${className ? className : ""}`}>
            <GroupForm   
                style={{ height: "100%" }}
                groupForm={{ 
                    defaultValue: defaultValue, 
                    placeholder: 'Search Pokemon by partial name', 
                    type: "text", 
                    name: "partialName",
                }}
                onFieldChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e)}
            />
        </form>
    )
}

export default PokemonSearchForm
