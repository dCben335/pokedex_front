import Button from "@/components/ui/Button/Button"
import Modal from "@/components/ui/Modal/Modal"
import styles from './HeaderModal.module.scss'
import { useUser } from "@/components/providers/UserContext";
import LogoutButton from "@/app/(auth)/_components/LogoutButton";

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
    }
]

const authRoutes = [
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'Register',
        path: '/register'
    }
]

const userRoutes = (username: string) => [
    {
        name: 'My Trainer',
        path: `/trainers/${username}`
    }
]

interface HeaderModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const HeaderModal = ({ isOpen, closeModal }: HeaderModalProps) => {  
    const { user } = useUser();

    const routes = user ? [...mainRoutes, ...userRoutes(user.login)] : [...mainRoutes, ...authRoutes]


    return (
        <Modal isOpen={isOpen} closeModal={closeModal} className={styles.headerModal}>
            <ul className={styles.modalList}>
                {routes.map((route, index) => (
                    <li key={index}>
                        <Button className={styles.navButton} href={route.path}  renderAs='link' onClick={() => closeModal()}>
                            {route.name}
                        </Button>
                    </li>
                ))}

                { user && (
                    <li>
                        <LogoutButton className={styles.navButton} />
                    </li>
                )}
            </ul>
        </Modal>
    )
}

export default HeaderModal
