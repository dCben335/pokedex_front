export const NEXT_PUBLIC_BASE_API_URL = "http://localhost:8080/api";

export interface Register {
    login: string;
    password: string;
    isAdmin: boolean;
}

if (!NEXT_PUBLIC_BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_BASE_API_URL is not set");
}

export const register = async (body: Register) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Error registering user");
        }

        return response.json();
    }
    catch (error) {
        console.error("Error registering user");
    }
}


