"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./PokedexFilters.module.scss"
import PokemonTypesModal from "../Pokemons/PokemonTypes/PokemonTypesModal/PokemonTypesModal";
import PokemonSearchForm from "./PokedexSearchForm";
import FilterIcon from "@/components/Icons/FilterIcon";


interface PokedexFiltersProps extends React.HTMLAttributes<HTMLElement> {
    isPokemons: boolean,
    entityName: string 
}

const PokedexFilters = ({ isPokemons, entityName, className, ...props } : PokedexFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowFilter = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>  
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <PokemonSearchForm entityName={entityName}/>
                    {isPokemons && (
                        <Button className={styles.showFilterBtn} onClick={() => handleShowFilter()}>
                            <FilterIcon />
                        </Button>
                    )}
                </div>
            </nav>
                    
            {isPokemons && (
                <PokemonTypesModal isOpen={isOpen} closeModal={handleShowFilter} />
            )}
        </>
    )
}

export default PokedexFilters;
