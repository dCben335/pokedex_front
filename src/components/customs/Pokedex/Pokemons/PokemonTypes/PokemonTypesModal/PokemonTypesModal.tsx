"use client"

import { usePokemonTypesContext } from "@/components/providers/PokemonTypesContext"
import Modal, { ModalProps } from "@/components/ui/Modal/Modal"
import PokemonTypesButton from "./PokemonTypesButton"
import styles from "./PokemonTypesModal.module.scss"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { createQueryString, getUrlTypes, removeQueryString } from "@/utils/queryParams"

type PokemonTypesModalProps = ModalProps & {
    
}

const PokemonTypesModal = ({ isOpen, closeModal }: PokemonTypesModalProps) => {
    const { types } = usePokemonTypesContext()

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const isActive = (type: string) => {
        const { typeOne, typeTwo } = getUrlTypes(searchParams)
        return type === typeOne || type === typeTwo
    }

    const isAll = () => {
        const { typeOne, typeTwo } = getUrlTypes(searchParams)
        return !typeOne && !typeTwo
    }

    const isDisabled = () => {
        const { typeOne, typeTwo } = getUrlTypes(searchParams)
        return (typeOne && typeTwo) ? true : false
    }

    const routerPush = (params: any) => {
        router.push(`${pathname}?${params}`)
    }

    const handleCategoryClick = (type: string) => {    
        const { typeOne, typeTwo } = getUrlTypes(searchParams);
        const updatedSearchParams = removeQueryString(searchParams, 'page');
    
        if (type === typeOne) {  
            return routerPush(removeQueryString(updatedSearchParams, 'typeOne'));
        }
        if (type === typeTwo) {
            return routerPush(removeQueryString(updatedSearchParams, 'typeTwo'));
        }

        if (!typeOne) {
            return routerPush(createQueryString(updatedSearchParams, 'typeOne', type));
        } 
        if (!typeTwo) {
            return  routerPush(createQueryString(updatedSearchParams, 'typeTwo', type));
        }
    }

    const handleAllClick = () => {
        const removedTypeOneFromParams = removeQueryString(searchParams, 'typeOne');
        const removedTypeTwoFromParams = removeQueryString(removedTypeOneFromParams, 'typeTwo');

        router.push(`${pathname}?${removedTypeTwoFromParams}`)
    }

    

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <ul className={styles.list}>
                <li className={styles.allBtnLi}>
                    <PokemonTypesButton 
                        name="All" 
                        color="radial-gradient(circle at 50%, var(--primary-color) 35%, var(--secondary-color) 100%)" 
                        isActive={isAll()}
                        handleClick={() => handleAllClick()}
                    />
                </li>
                {(types ?? []).map(({name, color}) => (
                    <li key={name}>
                        <PokemonTypesButton 
                            name={name} 
                            color={color} 
                            isActive={isActive(name)}
                            disabled={!isActive(name) && isDisabled()}
                            handleClick={handleCategoryClick}
                        />
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

export default PokemonTypesModal
