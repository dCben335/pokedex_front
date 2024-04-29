import Card from "@/components/ui/Card/Card";
import styles from "./PokedexCard.module.scss";
import Link from "next/link";
import StyledImage from "@/components/ui/StyledImage/StyledImage";


export interface PokedexCardProps {
    name?: string;
    image: string;
    url: string;

    types?: string[];
    backgroundColor?: string;
    skeleton?: false
}

interface PokedexSkeletonCardProps  {
    skeleton: true
}

type Props =  React.HTMLAttributes<HTMLElement> & (PokedexCardProps | PokedexSkeletonCardProps) & {
    isList?: boolean;
    scale?: number;

}

const PokedexCard = ({ className, skeleton, isList, scale = 1.025, ...props }: Props) => {
    const { name, image, backgroundColor, types, url, ...newProps } = props as PokedexCardProps;

    if (skeleton) {
        return (
            <Card className={`${styles.pokemonCard} skeleton ${styles.skeleton}`} {...newProps}> 
                <div className={`${styles.linkContainer} ${isList ? styles.list :  ""} skeleton`} >
                    <div className={`${styles.img} skeleton`}></div>
                    <div className={`${styles.h3} skeleton`}></div>
                    {isList && 
                        <div className={`${styles.types}`}>
                            <span className={`${styles.type} skeleton`}></span>
                            <span className={`${styles.type} skeleton`}></span>
                        </div>
                    }
                </div>
            </Card>
        );
    }

    return (
        <Card 
            scale={scale}
            className={`${styles.pokemonCard} ${className ? className : ""}`} 
            style={{"--_background-color": backgroundColor} as React.CSSProperties}
        > 
            <Link href={url} className={`${styles.linkContainer} ${isList ? styles.list :  ""}`}>
                <StyledImage 
                    className={styles.img}
                    src={image} 
                    alt={name ?? "image"} 
                    fill
                />
                {name && <h3>{name}</h3>}
                {types && isList && types.length > 0 &&
                    <div className={styles.types}>
                        {types.map((type, index) => 
                            <span key={index} className="h5">{type}</span>
                        )}
                    </div>
                }
            </Link>
        </Card>
    );
}

export default PokedexCard;
