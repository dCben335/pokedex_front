import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, PropsWithChildren, useEffect, use } from 'react';

const defaultColor = "#F86868";
type defaultColor = typeof defaultColor;
interface ThemeContextType {
    color: string | defaultColor;
    changeColor: (newColor: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    color: defaultColor,
    changeColor: () => {},
});

export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    const [color, setColor] = useState<string>(defaultColor);

    const pathname = usePathname()

    useEffect(() => {
        document.body.style.setProperty('--accent-color', color);
    }, [color]);

    useEffect(() => {
        setColor(defaultColor);
    }, [pathname]);

    const changeColor = (newColor: string) => {
        setColor(newColor);
    };

    return (
        <ThemeContext.Provider value={{ changeColor, color }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
