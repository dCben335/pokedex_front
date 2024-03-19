"use client"

import styles from './Card.module.scss'
import { CSSProperties, useRef, useState, MouseEvent, PropsWithChildren } from "react";

type CardProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren; 


const Card = ({ children, className, style, ...props }: CardProps) => {
    const projectCard = useRef<HTMLElement>(null)
    const [cardMouseHoverStyle, setCardMouseHoverStyle] = useState<CSSProperties>({}) 
    
    const onMouseMove = (event: MouseEvent) => {
        if (!projectCard.current) return;

        const mouseX = event.pageX - projectCard.current.offsetLeft;
        const mouseY = event.pageY - projectCard.current.offsetTop;

        setCardMouseHoverStyle({ 
            "--data-light-x" : `${mouseX}px`,
            "--data-light-y" : `${mouseY}px`,
        } as CSSProperties)
    }

    const onMouseLeave = () =>  {
        setCardMouseHoverStyle({...cardMouseHoverStyle})
    }

    return (
        <article 
            ref={projectCard}
            className={`${styles.card} ${className ? className : ""}`} 
            onMouseMove={(e) => onMouseMove(e)}
            onMouseLeave={() => onMouseLeave()} 
            style={{...cardMouseHoverStyle, ...style}}
            {...props} 
        >
            { children }   
        </article>
    )
}

Card.displayName = "Card"

export default Card;