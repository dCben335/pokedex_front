import Card from "@/components/ui/Card/Card";
import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { accentsTidy, slugify } from "@/utils/reformat";
import StyledImage from "@/components/ui/StyledImage/StyledImage";

export type PokemonCard = {
    name: string;
    image: string;
    types: string[];
    backgroundColor?: string;
    baseUrl?: string;
}

interface PokemonCardProps extends PokemonCard {
    skeleton?: false
    baseUrl: string;
}

interface PokemonSkeletonWrapperProps  {
    skeleton: true
    baseUrl?: string;
}

type Props =  React.HTMLAttributes<HTMLElement> & (PokemonCardProps | PokemonSkeletonWrapperProps) 

const PokemonCard = ({className, skeleton, ...props }: Props) => {
    const { name, image, backgroundColor, baseUrl, ...newProps } = props as PokemonCardProps;

    if (skeleton) {
        return (
            <Card className={`${styles.pokemonCard} skeleton ${styles.skeleton}`} {...newProps}> 
                <div className={`${styles.linkContainer} skeleton`} >
                    <div className={`${styles.img} skeleton`}></div>
                    <div className={`${styles.h3} skeleton`}></div>
                </div>
            </Card>
        );
    }

    return (
        <Card 
            className={`${styles.pokemonCard} ${className ? className : ""}`} 
            style={{"--_background-color": backgroundColor} as React.CSSProperties}
        > 
            <Link href={`${baseUrl}/${slugify(name)}`} className={styles.linkContainer}>
                <StyledImage 
                    className={styles.img}
                    src={image} 
                    alt={name} 
                    fill
                />
                <h3>{name}</h3>
            </Link>
        </Card>
    );
}

export default PokemonCard;
