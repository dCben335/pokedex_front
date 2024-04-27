"use client"

import { useUser } from '@/components/providers/UserContext';
import { notFound } from 'next/navigation';
import TrainerForm from '../TrainerForm/TrainerForm';
import styles from './TrainerFallBack.module.scss';
import Loading from '@/components/ui/Loading/Loading';

type TrainerFallBackProps = {
    userName: string;
    editMode?: boolean;
}

const TrainerFallBack = ({ userName, editMode } : TrainerFallBackProps) => {
    const { user, token, isLoading } = useUser()
    
    if (isLoading) return <Loading />
    if (user?.login !== userName || !token) return notFound();
    
    return (
        <main>
            <TrainerForm username={userName} token={token} />
        </main>
    );
};

export default TrainerFallBack;