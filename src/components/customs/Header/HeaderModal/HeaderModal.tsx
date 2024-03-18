import Button from "@/components/ui/Button/Button"
import Modal from "@/components/ui/Modal/Modal"
import styles from './HeaderModal.module.scss'

const mainRoutes = [
    {
        name: 'Pokemons',
        path: '/pokemons'
    },
    {
        name: 'Types',
        path: '/types'
    },
    {
        name: 'Abilities',
        path: '/abilities'
    },
    {
        name: "login",
        path: "/login"
    }, 
    {
        name: "register",
        path: "/register"
    }
]

interface HeaderModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const HeaderModal = ({ isOpen, closeModal }: HeaderModalProps) => {  
    return (
        <Modal isOpen={isOpen} closeModal={closeModal} className={styles.headerModal}>
            <ul className={styles.modalList}>
                {mainRoutes.map((route, index) => (
                    <li key={index}>
                        <Button className={styles.navButton} href={route.path}  renderAs='link' onClick={() => closeModal()}>
                            {route.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

export default HeaderModal
