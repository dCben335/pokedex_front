import { getUserInfo } from "@/libs/routes/user";
import { User } from "@/libs/zod/user";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
};

  // Create the context
const UserContext = createContext<UserContextType>({
    user: null,
    token: null,
    setUser: () => {},
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
        <UserContext.Provider value={{ user, token, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
