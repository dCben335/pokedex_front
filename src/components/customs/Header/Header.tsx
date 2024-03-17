import Logo from '@/components/Icons/Logo';
import styles from './Header.module.scss';
import BurgerButton from '@/components/ui/BurgerButton/BurgerButton';
import { useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <header className={styles.header}>
                <div>
                    <BurgerButton 
                        className={styles.burgerButton}
                        cross={isOpen} 
                        onClick={() => handleClick()}
                    />
                </div>

                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        <Logo />
                    </Link>
                </div>


                <div></div>
            </header>
            <Modal isOpen={isOpen} closeModal={handleClick} >

            </Modal>
        </>
    );
}

export default Header;