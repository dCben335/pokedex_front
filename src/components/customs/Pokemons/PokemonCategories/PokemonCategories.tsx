"use client";

import { useState } from "react";
import { usePokemonType } from "@/components/providers/PokemonTypeContext";
import Button from "@/components/ui/Button/Button";
import { createQueryString, removeQueryString } from "@/utils/queryParams";
import { useSearchParams, useRouter, usePathname} from 'next/navigation';
import PokemonCategoryButton from "../PokemonCategoryButton/PokemonCategoryButton";
import styles from "./PokemonCategories.module.scss"
import BurgerButton from "@/components/ui/BurgerButton/BurgerButton";



const PokemonCategories = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { types } = usePokemonType()

    const handleShowFilter = () => {
        setIsOpen(!isOpen)
    }
    

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const isActive = (type: string) => {
        const typeOne = searchParams.get('typeOne')
        const typeTwo = searchParams.get('typeTwo')

        return type === typeOne || type === typeTwo
    }

    const isAll = () => {
        const typeOne = searchParams.get('typeOne')
        const typeTwo = searchParams.get('typeTwo')

        return !typeOne && !typeTwo
    }

    const handleCategoryClick = (type: string) => {    
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
        <nav className={styles.nav}>
            <Button className={styles.showFilterBtn} onClick={() => handleShowFilter()}>
                Filters
            </Button>

            <div className={`${styles.filters} ${isOpen ? styles.opened : styles.closed}`}>
                <span className={styles.overlay} onClick={() => handleShowFilter()}></span>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <BurgerButton cross={true} className={styles.burger} onClick={() => handleShowFilter()} />
                        <ul>
                            <li className={styles.allBtnLi}>
                                <PokemonCategoryButton 
                                    name="All" 
                                    color="radial-gradient(circle at 50%, #151818 15%, #101010 35%, #ffffff 100%)" 
                                    isActive={isAll()}
                                    handleClick={() => router.push(pathname)}
                                />
                            </li>
                            {(types ?? []).map(({name, color}) => (
                                <li key={name}>
                                    <PokemonCategoryButton 
                                        name={name} 
                                        color={color} 
                                        isActive={isActive(name)}
                                        handleClick={handleCategoryClick}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default PokemonCategories;
