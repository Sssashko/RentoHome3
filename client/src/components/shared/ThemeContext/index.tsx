import React, { createContext, useContext, useState, useEffect } from 'react';

// Define possible theme values
type Theme = 'light' | 'dark';

// Context value shape: current theme + toggle function
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create React context (will hold theme state)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component wraps app and manages theme state
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light'); // default to light

  useEffect(() => {
    // Add or remove CSS class on <html> when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // run this effect whenever `theme` updates

  // Switch between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide theme and toggle function to children
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to read theme context in components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export default ThemeContext;
