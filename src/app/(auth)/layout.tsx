"use client"

import { useUser } from "@/components/providers/UserContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const AuthLayout = ({children} : PropsWithChildren) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {

            console.log('User is logged in, redirecting to home page');
            console.log(user);
            router.push('/');
        }
    }, [user, router]);

    if (user) {
        return <></>    
    } 

    return (
        <>
            {children}
        </>
    );
}

export default AuthLayout;