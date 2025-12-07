import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            title={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
            {theme === 'light' ? '🌞 Claro' : '🌙 Escuro'}
        </button>
    );
};

export default ThemeToggle;