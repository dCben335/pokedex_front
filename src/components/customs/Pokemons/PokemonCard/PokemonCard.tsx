import Card from "@/components/ui/Card/Card";
import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { accentsTidy } from "@/utils/reformat";

export type PokemonCard = {
    name: string;
    image: string;
    types: string[];
    backgroundColor?: string;
}

interface PokemonCardProps extends PokemonCard {
    skeleton?: false
}

interface PokemonSkeletonWrapperProps  {
    skeleton: true
}

type Props =  React.HTMLAttributes<HTMLElement> & (PokemonCardProps | PokemonSkeletonWrapperProps)

const PokemonCard = ({ className, skeleton, ...props }: Props) => {
    const { name, image, backgroundColor, ...newProps } = props as PokemonCardProps;

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
        <Card className={`${styles.pokemonCard} ${className ? className : ""}`} {...newProps}> 
            <Link href={`/pokemon/${accentsTidy(name)}`} className={styles.linkContainer} style={{backgroundColor: backgroundColor}}>
                <img className={styles.img} src={image} alt={name} />
                <h3>{name}</h3>
            </Link>
        </Card>
    );
}

export default PokemonCard;
