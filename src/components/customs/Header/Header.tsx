import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeContext';
import styles from './Header.module.scss';

import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import ThemeIcon from '@/components/Icons/ThemeLogo';
import Logo from '@/components/Icons/Logo';
import BurgerButton from '@/components/ui/BurgerButton/BurgerButton';
import HeaderModal from './HeaderModal/HeaderModal';



const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const { swichTheme } = useTheme()

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


                <div className={styles.themeContainer}>
                    <button title='swhich theme button' onClick={swichTheme} className={styles.themeButton}>
                        <ThemeIcon />
                    </button>
                </div>
            </header>
            <HeaderModal isOpen={isOpen} closeModal={handleClick} />
        </>
    );
}

export default Header;