import Card from "@/components/ui/Card/Card";
import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { accentsTidy, slugify } from "@/utils/reformat";
import StyledImage from "@/components/ui/StyledImage/StyledImage";


interface PokemonCardProps {
    name: string;
    image: string;
    types: string[];
    backgroundColor?: string;
    baseUrl: string;
    skeleton?: false
}

interface PokemonSkeletonCardProps  {
    skeleton: true
}

type Props =  React.HTMLAttributes<HTMLElement> & (PokemonCardProps | PokemonSkeletonCardProps) & {
    isList?: boolean;
}

const PokemonCard = ({className, skeleton, isList, ...props }: Props) => {
    const { name, image, backgroundColor, baseUrl, types, ...newProps } = props as PokemonCardProps;

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
            className={`${styles.pokemonCard} ${className ? className : ""}`} 
            style={{"--_background-color": backgroundColor} as React.CSSProperties}
            scale={isList ? 1.015 : 1.05}
        > 
            <Link href={`${baseUrl}/${slugify(name)}`} className={`${styles.linkContainer} ${isList ? styles.list :  ""}`}>
                <StyledImage 
                    className={styles.img}
                    src={image} 
                    alt={name} 
                    fill
                />
                <h3>{name}</h3>

                {isList && 
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

export default PokemonCard;
