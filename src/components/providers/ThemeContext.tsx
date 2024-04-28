"use client"

import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, PropsWithChildren, useEffect, use } from 'react';
import Loading from '../ui/Loading/Loading';

const defaultColor = "#F86868";
const defaultTheme = "light";
type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    changeColor: (newColor: string) => void;
    swichTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    changeColor: () => {},
    swichTheme: () => {},
});

export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};


export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    usePathname();
    const [theme, setTheme] = useState<Theme>(
        typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : defaultTheme
    );

    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--accent-color', defaultColor);
        document.documentElement.classList.add(theme); 
    }


    const swichTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.remove(prev);
            document.documentElement.classList.add(newTheme);
            return newTheme;
        });
    }

    const changeColor = (newColor: string) => {
        document.documentElement.style.setProperty('--accent-color', newColor);
    };
    
    return (
        <ThemeContext.Provider value={{ changeColor, theme, swichTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
