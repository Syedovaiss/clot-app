import React from "react";
import { createContext, useState,ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";


interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
  }
  

const  ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isDarkMode = useColorScheme() == 'dark'
    const [theme, setTheme] = useState<string>(isDarkMode ? 'dark': 'light');
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

  // Custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };