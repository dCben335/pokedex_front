"use client"

import { useUser } from "@/components/providers/UserContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const layout = ({children} : PropsWithChildren) => {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    if (user) {
        return <></>
    } 

    return (
        <>
            {children}
        </>
    );
}

export default layout;