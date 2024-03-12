import Card from "@/components/ui/Card/Card";
import styles from "./PokemonCard.module.scss";
import Link from "next/link";

export type PokemonCard = {
    name: string;
    image: string;
    types: string[];
    backgroundColor?: string;
}


type PokemonCardProps = React.HTMLAttributes<HTMLDivElement> & PokemonCard 


const PokemonCard = ({ className, name, image, types, backgroundColor }: PokemonCardProps) => {
    return (
        <Card className={`${styles.pokemonCard} ${className ? className : ""}`} scale={1.1}> 
            <Link href={`/pokemon/${name}`} className={styles.linkContainer} style={{backgroundColor: backgroundColor}}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
            </Link>
        </Card>
    );
}

export default PokemonCard;
