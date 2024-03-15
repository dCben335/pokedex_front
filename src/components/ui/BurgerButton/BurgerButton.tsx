import styles from "./BurgerButton.module.scss"

interface BurgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    cross: boolean,
}

const BurgerButton = ({ cross, className, ...props }:  BurgerButtonProps) => { 
    return (
        <button 
            className={`${styles.burgerButton} ${cross ? styles.cross : ""} ${className}`}
            title="burger-button" 
            {...props}
            >
            <span title="burger-menu-bar"></span>
            <span title="burger-menu-bar"></span>
            <span title="burger-menu-bar"></span>
        </button>
    )
}


export default BurgerButton;