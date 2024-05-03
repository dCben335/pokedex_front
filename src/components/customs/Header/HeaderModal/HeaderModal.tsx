import Button from "@/components/ui/Button/Button"
import Modal from "@/components/ui/Modal/Modal"
import styles from './HeaderModal.module.scss'
import LogoutButton from "@/components/customs/Auth/LogoutButton";
import { slugify } from "@/utils/reformat";

const mainRoutes = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Pokemons',
        path: '/pokemons'
    },
    {
        name: 'Trainers',
        path: '/trainers'
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
        path: `/trainers/${slugify(username)}`
    }
]

interface HeaderModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const HeaderModal = ({ isOpen, closeModal }: HeaderModalProps) => {  
    const isAdminBool = false;
    const isUser =  false;
    const routes = [...mainRoutes, ...authRoutes]

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

                {isAdminBool && (
                    <li>
                        <Button className={styles.navButton} href='/admin'  renderAs='link' onClick={() => closeModal()}>
                            Admin
                        </Button>
                    </li>
                )}

                {isUser && (
                    <li>
                        <LogoutButton className={styles.navButton} />
                    </li>
                )}
            </ul>
        </Modal>
    )
}

export default HeaderModal
