"use server"

import { getCookies } from "@/actions/cookies";
import { getUserInfoFromToken } from "@/libs/routes/entities/user";
import { PropsWithChildren, useEffect } from "react";

const AuthLayout = async({children} : PropsWithChildren) => {
    const { token, login } = await getCookies()
    const user = await getUserInfoFromToken(token);

    if (user) {
        //navigate("/pokemons")
    }

    return (
        <>
            {children}
        </>
    );
}

export default AuthLayout;