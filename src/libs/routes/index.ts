"use server";

import { ZodSchema } from "zod";
import { handleApiFetchErrors } from "./errors";

const { BASE_API_URL } = process.env;
if (!BASE_API_URL) throw new Error("Missing BASE_API_URL environment variable");

type handleApiFetchProps = {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    schema?: ZodSchema;
    body?: string;
    token?: string;

}


export const handleApiFetch = async({ path, token, method, body }: handleApiFetchProps) => {
    return await handleApiFetchErrors(async() => {
        const response = await fetch(`${BASE_API_URL}/${path}`, {
            method: method,
            headers: token ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            } : {
                "Content-Type": "application/json",
            },
            body: body ?? undefined,
        });

        if (response.status !== 200) throw new Error(`${response.status}`)
        return await response.json();
    });    
}

