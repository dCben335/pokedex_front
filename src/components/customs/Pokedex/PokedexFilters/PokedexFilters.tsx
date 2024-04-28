"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./PokedexFilters.module.scss"
import PokemonTypesModal from "../Pokemons/PokemonTypes/PokemonTypesModal/PokemonTypesModal";
import PokemonSearchForm from "./PokedexSearchForm";
import FilterIcon from "@/components/Icons/FilterIcon";


interface PokedexFiltersProps {
    isPokemons: boolean   
}

const PokedexFilters = ({ isPokemons } : PokedexFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowFilter = () => {
        setIsOpen(!isOpen)
    }
    

    return (
        <>  
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <PokemonSearchForm />
                    {isPokemons && (
                            <Button className={styles.showFilterBtn} onClick={() => handleShowFilter()}>
                                <FilterIcon />
                            </Button>
                        )
                    }
                </div>
            </nav>

            {isPokemons && (
                <PokemonTypesModal isOpen={isOpen} closeModal={handleShowFilter} />
            )}
        </>
    )
}

export default PokedexFilters;
