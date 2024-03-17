"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./PokemonFilters.module.scss"
import PokemonTypesModal from "./PokemonTypesModal/PokemonTypesModal";
import PokemonSearchForm from "./PokemonSearchForm/PokemonSearchForm";
import FilterIcon from "@/components/Icons/FilterIcon";


const PokemonCategories = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowFilter = () => {
        setIsOpen(!isOpen)
    }
    

    return (
        <>  
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <PokemonSearchForm />
                    <Button className={styles.showFilterBtn} onClick={() => handleShowFilter()}>
                        <FilterIcon />
                    </Button>
                </div>
            </nav>

            <PokemonTypesModal isOpen={isOpen} closeModal={handleShowFilter} />
        </>
    )
}

export default PokemonCategories;
