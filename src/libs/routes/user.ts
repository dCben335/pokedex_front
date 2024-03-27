import { UserRequest, userResponseSchema, userSchema } from "../zod/user";

export const NEXT_PUBLIC_BASE_API_URL = "http://localhost:8090/api";


export const register = async (body: UserRequest) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status === 409) {
            throw new Error("User already exists");
        }
        
        if (!response.ok) {
            throw new Error("Error registering user");
        }

        const data = await response.json();
        return userResponseSchema.parse(data);
    }
    catch (error: any) {
        return { error: error.message };
    }
}

export const login = async (body: UserRequest) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log(response);
            throw new Error("Error logging in");
        }

        const data = await response.json();
        return userResponseSchema.parse(data);
    }
    catch (error: any) {
        return { error: error.message };
    }
}


export const getUserInfo = async (token: string) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching user info");
        }

        const data = await response.json();
        return userSchema.parse(data);
    
    } catch (error: any) {
        return { error: error.message };
    }
}


