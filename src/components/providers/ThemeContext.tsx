// contexts/ColorContext.tsx

import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';

// Define context type
interface ColorContextType {
    color: string;
    changeColor: (newColor: string) => void;
}

// Create context with default values
const ColorContext = createContext<ColorContextType>({
    color: 'blue',
    changeColor: () => {},
});

// Custom hook to use the color context
export const useColor = ({}): ColorContextType => {
    return useContext(ColorContext);
};

// Context Provider component
export const ColorProvider = ({ children } : PropsWithChildren) => {
    const [color, setColor] = useState<string>('blue');

    useEffect(() => {
        document.documentElement.style.setProperty('--global-color', color);
    }, [color]);

    const changeColor = (newColor: string) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, changeColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export default ColorContext;
