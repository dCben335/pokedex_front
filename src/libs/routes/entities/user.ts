import { parseWithZodSchema } from "@/utils/parse";
import { UserRequest, userResponseSchema, userSchema } from "../../schemas/entities/user";
import { handleApiFetch } from "..";


const API_USER_BASE_URL = `users`;

export const register = async (body: UserRequest) => {
    const data = await handleApiFetch({
        path: `${API_USER_BASE_URL}/register`,
        method: "POST",
        body: JSON.stringify(body),
    });
    if ("error" in data) return data;

    return parseWithZodSchema(userResponseSchema, data);
}


export const login = async (body: UserRequest) => {
    const data = await handleApiFetch({
        path: `${API_USER_BASE_URL}/login`,
        method: "POST",
        body: JSON.stringify(body),
    });
    if ("error" in data) return data;

    return parseWithZodSchema(userResponseSchema, data);
}

//GET /me
export const getUserInfoFromToken = async (token: string) => {
    const data = await handleApiFetch({
        path: `${API_USER_BASE_URL}/me`,
        method: "GET",
        token: token,
    });
    
    if ("error" in data) return data;
    return parseWithZodSchema(userSchema, data);
}


