import Image from "next/image";
import styles from "./StyledImage.module.scss";

export type Image = {
    src: string;
    alt: string;
}

export interface StyledImageProps extends Image, React.HTMLAttributes<HTMLDivElement> {
    fill: boolean;
}

const StyledImage = ({ className, src, alt, fill, ...props }: StyledImageProps) => {
    return (
        <div className={`${styles.styledImage} ${className ? className : ""}`} {...props}>
            <Image 
                src={src} 
                alt={alt} 
                fill={fill}
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
            />
        </div>
    );
}

StyledImage.displayName = "StyledImage";

export default StyledImage;



