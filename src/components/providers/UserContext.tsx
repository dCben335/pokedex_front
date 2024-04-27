import { getUserInfo } from "@/libs/routes/entities/user";
import { User } from "@/libs/schemas/user";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setUser: (user: User, token: string) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    token: null,
    isLoading: true,
    setUser: () => {},
    logout: () => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUserData] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        })();
    }, [token, user]);


    return (
        <UserContext.Provider value={{ user, token, isLoading, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
