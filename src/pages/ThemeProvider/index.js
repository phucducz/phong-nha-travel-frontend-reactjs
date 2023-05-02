import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme == 'dark' ? 'light' : 'dark');
    }

    const valueTheme = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={valueTheme}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }