"use client"

import styles from './Card.module.scss'
import { CSSProperties, useRef, useState, MouseEvent, PropsWithChildren } from "react";

type CardProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren & {
    scale?: number;
}; 


const Card = ({ children, className, style, scale, ...props }: CardProps) => {
    const projectCard = useRef<HTMLElement>(null)
    const [cardMouseHoverStyle, setCardMouseHoverStyle] = useState<CSSProperties>({}) 
    
    const onMouseMove = (event: MouseEvent) => {
        if (!projectCard.current) return;

        const mouseX = event.pageX - projectCard.current.offsetLeft;
        const mouseY = event.pageY - projectCard.current.offsetTop;

        setCardMouseHoverStyle({ 
            "--data-light-x" : `${mouseX}px`,
            "--data-light-y" : `${mouseY}px`,

            transform: `scale(${scale ? scale : 1})`,
        } as CSSProperties)
    }

    const onMouseLeave = () =>  {
        setCardMouseHoverStyle({...cardMouseHoverStyle, transform: `scale(1)`})
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