"use client";

import GroupForm from "@/components/ui/GroupForm/GroupForm"
import { createQueryString } from "@/utils/queryParams"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, HTMLAttributes, use, useEffect, useState } from "react"

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
            router.push(`${pathname}?${createQueryString(searchParams, 'partialName', inputValue)}`);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [inputValue]);


    return (
        <form {...props} className={`${className ? className : ""}`}>
            <GroupForm   
                style={{ height: "100%" }}
                groupForm={{ 
                    defaultValue: defaultValue, 
                    placeholder: 'Search Pokemon by partial name', 
                    type: "text", 
                    name: "search",
                }}
                onFieldChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e)}
            />
        </form>
    )
}

export default PokemonSearchForm
