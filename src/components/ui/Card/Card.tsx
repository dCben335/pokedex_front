"use client"

import styles from './Card.module.scss'
import { CSSProperties, useRef, useState, MouseEvent, PropsWithChildren } from "react";

type CardProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren; 


export default function Card({ children, className, style, ...props }: CardProps) {
    const projectCard = useRef<HTMLElement>(null)
    const [cardMouseHoverStyle, setCardMouseHoverStyle] = useState<CSSProperties>({}) 
    
    const mouseOnProject = (event: MouseEvent) => {
        if (!projectCard.current) return;

        const mouseX = event.pageX - projectCard.current.offsetLeft;
        const mouseY = event.pageY - projectCard.current.offsetTop;

        setCardMouseHoverStyle({ 
            "--data-light-x" : ` ${mouseX}px`,
            "--data-light-y" : ` ${mouseY}px`,
        } as CSSProperties)
    }

    const mouseLeaveProject = () =>  {
        setCardMouseHoverStyle({...cardMouseHoverStyle})
    }

    return (
        <article 
            {...props} 
            ref={projectCard}
            className={`${styles.card} ${className ? className : ""}`} 
            onMouseMove={(e) =>  mouseOnProject(e)}
            onMouseLeave={() => mouseLeaveProject()} 
            style={{...cardMouseHoverStyle, ...style}}
        >
            { children }   
        </article>
    )
}