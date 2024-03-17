import { HTMLAttributes, PropsWithChildren, use, useEffect, useState } from "react"
import styles from './Modal.module.scss'

export interface ModalProps {
    isOpen: boolean
    closeModal: () => void
}

type Props = PropsWithChildren<ModalProps> & HTMLAttributes<HTMLDivElement>


const Modal = ({ closeModal, isOpen, children, className, ...props }: Props) => {

    useEffect(() => {
        document.body.classList.toggle('noScroll', isOpen)
    }, [isOpen])

    return (
        <aside className={`${styles.filters} ${isOpen ? styles.opened : styles.closed} ${className ? className : ""}`} {...props}>
            <span className={styles.overlay} onClick={() => closeModal()}></span>
            <div className={styles.container}>
                <div className={styles.inner}>
                    {/* <BurgerButton cross={true} className={styles.burger} onClick={() => closeModal()} /> */}
                    {children}
                </div>
            </div>
        </aside>
    )
}

export default Modal;