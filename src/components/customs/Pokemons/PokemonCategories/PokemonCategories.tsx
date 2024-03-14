"use client";

import { usePokemonType } from "@/components/providers/PokemonTypeContext";
import Button from "@/components/ui/Button/Button";
import { createQueryString, removeQueryString } from "@/utils/queryParams";
import { useSearchParams, useRouter, usePathname} from 'next/navigation';



const PokemonCategories = () => {
    const { types } = usePokemonType()
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const isActive = (type: string) => {
        const typeOne = searchParams.get('typeOne')
        const typeTwo = searchParams.get('typeTwo')

        return type === typeOne || type === typeTwo
    }

    const handleClick = (type: string) => {    
        const typeOne = searchParams.get('typeOne')
        const typeTwo = searchParams.get('typeTwo')

        if (type === typeOne) {  
            return router.push(`${pathname}?${removeQueryString(searchParams, 'typeOne')}`)
        }

        if (type === typeTwo) {
            return router.push(`${pathname}?${removeQueryString(searchParams, 'typeTwo')}`)
        }

        if (!typeOne) {
            return router.push(`${pathname}?${createQueryString(searchParams, 'typeOne', type)}`)
        }

        if (!typeTwo) {
            return router.push(`${pathname}?${createQueryString(searchParams, 'typeTwo', type)}`)
        }
    }


    return (
        <ul>
            {(types ?? []).map(({name, color}) => (
                <li key={name}>
                    <Button 
                        style={{
                            backgroundColor: isActive(name) ? color : '',
                        }}
                        onClick={() => handleClick(name)}
                    >
                        {name}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default PokemonCategories;
