"use client";

import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import { useState } from 'react';
import styles from './PokedexDelete.module.scss';
import { toast } from 'sonner';
import { navigate, refreshTag } from '@/actions/navigate';

type PokedexDeleteProps = {
    entityName: string;
    deleteFunction: () => { error : string } | {};
    redirectToUrl: string;
    successMessage: string;
    refreshTagName: string;
}

const PokedexDelete = ({ entityName, deleteFunction, redirectToUrl, successMessage, refreshTagName } : PokedexDeleteProps) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleDelete = async() => {
        const response = await deleteFunction();
        if ("error" in response) {
            return toast.error(response.error);
        }

        handleModal();
        await refreshTag(refreshTagName);
        await navigate(redirectToUrl);
        toast.success(successMessage);
    }

    const handleModal = () => {
        setIsOpened(!isOpened)
    }

    return (
        <>
            <Button onClick={() => handleModal()} className={styles.delete}>Delete</Button>   
            <Modal isOpen={isOpened} closeModal={handleModal}>
                <div className={styles.modal}>
                    <h2>Are you sure you want to delete this {entityName} ?</h2>
                    <div className={styles.buttons}>
                        <Button onClick={() => handleDelete()} className={styles.delete}>Yes</Button>
                        <Button onClick={() => handleModal()}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PokedexDelete;