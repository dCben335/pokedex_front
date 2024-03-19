import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, PropsWithChildren, useEffect, use } from 'react';

const defaultColor = "#F86868";
type DefaultColor = typeof defaultColor;

const defaultTheme = "light";
type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    color: string | DefaultColor;
    changeColor: (newColor: string) => void;
    swichTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    color: defaultColor,
    changeColor: () => {},
    swichTheme: () => {},
});

export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [color, setColor] = useState<string>(defaultColor);
    const pathname = usePathname()


    useEffect(() => {
        document.documentElement.style.setProperty('--accent-color', color);
    }, [color]);
    
    useEffect(() => {
        document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
        document.documentElement.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        setColor(defaultColor);
    }, [pathname]);
    

    const swichTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const changeColor = (newColor: string) => {
        setColor(newColor);
    };

    return (
        <ThemeContext.Provider value={{ changeColor, color, theme, swichTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
