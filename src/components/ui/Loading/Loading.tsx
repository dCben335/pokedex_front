import PokeBall from '@/components/Icons/PokeBall';
import styles from './Loading.module.scss';

type LoadingProps = {
    
}

const Loading = ({  } : LoadingProps) => {
    return (
        <div className={styles.loader}>
            <PokeBall className={styles.pokeball} />
        </div>
    );
};

export default Loading;