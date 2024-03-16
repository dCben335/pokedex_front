"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./PokemonFilters.module.scss"
import PokemonTypesModal from "./PokemonTypesModal/PokemonTypesModal";


const PokemonCategories = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowFilter = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>  
            <Button className={styles.showFilterBtn} onClick={() => handleShowFilter()}>
                Filters
            </Button>

            <PokemonTypesModal isOpen={isOpen} closeModal={handleShowFilter} />
        </>
    )
}

export default PokemonCategories;
