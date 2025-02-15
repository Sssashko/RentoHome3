import React from 'react';
import { useTheme } from '../ThemeContext'; // Импортируем хук useTheme

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Используем хук для доступа к теме и функции переключения

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'} {/* Иконки для светлой и темной темы */}
    </button>
  );
};

export default ThemeToggle;