import Button from '@/components/ui/Button/Button';
import styles from './PokemonPagination.module.scss';
import { createQueryString, getUrlTypes } from '@/utils/queryParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PokemonPaginationProps {
    currentPage: number;
    total: number;
}

const PokemonPagination = ({ currentPage, total }: PokemonPaginationProps) => {
    const pageNumbers = Array(total).fill(0).map((_, i) => i);
    
    if (!pageNumbers.at(1)) return;

    const isVisible = (index: number) => {
        const bool = isFirstOrLast(index)
        if (bool) return true;
        if (index === currentPage + 1) return true;
        if (index === currentPage - 1) return true;
        if (index === currentPage) return true;
        return false;
    }


    const isFirstOrLast = (index: number) => {
        if (index === 0) return true;
        if (index === total - 1) return true;
        return false;
    }

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    


    const handleClick = (pageNumber: number) => {    
        return router.push(`${pathname}?${createQueryString(searchParams, 'page', pageNumber.toString())}`)
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {pageNumbers.map((number) => (
                    isVisible(number) &&
                        <li key={number} className={styles.item}>
                            <Button 
                                active={number === currentPage} 
                                onClick={() => handleClick(number)}
                                className={`${styles.btn} ${isFirstOrLast(number) ? styles.firstOrLast : ""} ${number === currentPage ? styles.active : ""}`}
                                >
                                {number + 1}
                            </Button>
                        </li>
                ))}
            </ul>
        </nav> 
    );
}

export default PokemonPagination;
