"use client"

import { getCookies } from "@/actions/cookies";
import { refreshTag } from "@/actions/navigate";
import Button from "@/components/ui/Button/Button";
import { createTrainerMark } from "@/libs/routes/entities/trainer";
import { HTMLAttributes, PropsWithChildren, useState } from "react";
import { toast } from "sonner";

type TrainerCatchButtonProps = HTMLAttributes<HTMLElement> & PropsWithChildren<{
    isToCatch: boolean;
    pokemonId: string;
    already: boolean;
}>;

const TrainerCatchButton = ({ pokemonId, isToCatch, already, children } : TrainerCatchButtonProps) => {
    const [isSuccess, setIsSuccess] = useState(already);
    const handleCatch = async(e: any) => {
        e.preventDefault();
        const { token, login } = await getCookies()

        const response = await createTrainerMark(pokemonId, isToCatch, token) as {} | { error: string };
        if ("error" in response) {
            return toast.error(response.error);
        }

        refreshTag(`trainer-${login}`);
        toast.success(`Pokemon ${isToCatch ? 'caught' : 'seen'}`);
        setIsSuccess(true);
    }

    return (
        <Button onClick={(e) => handleCatch(e)} disabled={isSuccess}>
            {children}
        </Button>
    );
};

export default TrainerCatchButton;