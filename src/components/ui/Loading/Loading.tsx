import PokeBall from '@/components/Icons/PokeBall';
import styles from './Loading.module.scss';
import { HTMLAttributes } from 'react';

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
    
}

const Loading = ({ className, ...props } : LoadingProps) => {
    return (
        <div className={`${styles.loader} ${className ? className : ""}`} {...props}>
            <PokeBall className={styles.pokeball} />
        </div>
    );
};

export default Loading;