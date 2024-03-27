import { getUserInfo } from "@/libs/routes/user";
import { User } from "@/libs/zod/user";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    token: null,
    setUser: () => {},
    logout: () => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUserData] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const setUser = (user: User, token: string) => {
        setUserData(user);
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        try {
            setUserData(null);
            setToken(null);
            localStorage.removeItem('token');
            return toast.success('Logged out successfully');
        } catch (error) {
            toast.error('An error occurred while logging out');
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem('token') ?? null);
    }, []);

    useEffect(() => {
        if (user || !token) return;

        (async () => {
            const response = await getUserInfo(token);
            
            if ('error' in response) {
                return toast.error(response.error);
            }
            
            setUserData(response);
        })();
    }, [token]);


    return (
        <UserContext.Provider value={{ user, token, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
