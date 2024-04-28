"use server"

import { cookies } from "next/headers"

interface StoreTokenRequest {
    token: string
    login: string
}

export async function storeToken(request: StoreTokenRequest) {
    Object.keys(request).forEach(key => {
        if (!request[key as keyof StoreTokenRequest]) {
            throw new Error(`The ${key} is required`)
        }

        cookies().set({
            name: key,
            value: request[key as keyof StoreTokenRequest],
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
    })
}