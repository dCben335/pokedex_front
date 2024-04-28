"use server"

import { cookies } from "next/headers"

export interface Cookies {
    token: string
    login: string
}

export const storeCookies = async (request: Cookies) => {
    Object.keys(request).forEach(key => {
        if (!request[key as keyof Cookies]) {
            throw new Error(`The ${key} is required`)
        }

        cookies().set({
            name: key,
            value: request[key as keyof Cookies],
            sameSite: "strict",
        })
    })
}

export const getCookies = async () =>{
    const cookie = cookies().getAll();
    const cookiesObject: Cookies = {} as Cookies;
    cookie.forEach(({ name, value }) =>  cookiesObject[name as keyof Cookies] = value)

    return cookiesObject;
}

export const deleteCookies = async () => {
    const cookie = cookies().getAll();
    cookie.forEach(({ name }) => cookies().delete(name));
}




