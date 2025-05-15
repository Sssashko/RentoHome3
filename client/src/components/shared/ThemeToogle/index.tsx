import React from 'react';
import { useTheme } from '../ThemeContext'; // hook to access theme

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // get current theme & toggle function

  return (
    <button
      onClick={toggleTheme} // switch theme on click
      className="
        p-2 rounded-lg
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition-colors
      "
    >
      {/* Show moon icon in light mode, sun icon in dark mode */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
