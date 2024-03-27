"use client"

import Select from "@/components/ui/Select/Select";
import { createQueryString, removeQueryString } from "@/utils/queryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./PokedexSize.module.scss"

const options = [
    { value: '6', label: '6' },
    { value: '12', label: '12' },
    { value: '24', label: '24' },
    { value: '36', label: '36' },
    { value: '48', label: '48' },
]

type PokemonSizeProps = React.HTMLAttributes<HTMLDivElement> & {
    total: number;
}

const PokemonSize = ({ total, ...props}: PokemonSizeProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const defaultValue = searchParams.get('size') ?? "12";
    if (!options.find(option => option.value === defaultValue)) {
        options.push({ value: defaultValue, label: defaultValue });
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = e.target.value;
        if (searchParams.get('size') === size) return
        
        const updatedSearchParams = removeQueryString(searchParams, 'page');
        router.push(`${pathname}?${createQueryString(updatedSearchParams, 'size', size)}`);
    }


    return (
        <div { ...props} className={styles.container}>
            <div className={styles.size}>
                <span className={styles.info}>(Nombre de pokémons à afficher)</span>
                <Select 
                    onChange={(e) => handleChange(e)} 
                    options={options}  
                    defaultValue={defaultValue}
                />
            </div>

            <div> 
                <span className={styles.info}>Total de pokémons: {total}</span>
            </div>
        </div>
    )
}

export default PokemonSize;