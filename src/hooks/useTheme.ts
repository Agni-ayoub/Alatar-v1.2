import { useLayoutEffect, useState } from 'react';

type Themes = 'light-blue' | 'light-pruple' | 'dark-blue';
type Shades = 'pruple' | 'blue';
type Mode = 'dark-' | 'light-';

/**
 * Custom hook to manage and toggle between light and dark themes.
 *
 * @returns {Object} An object containing:
 * - `handleThemeChange`: Function to toggle the theme between light and dark.
 * - `isDark`: Boolean indicating if the current theme is dark.
 * - `shade`: The current color (shade) of the theme.
 * - `setShade`: Function to set the shade of the theme.
 *
 * @remarks
 * The hook uses `localStorage` to persist the theme across sessions and `useLayoutEffect` to apply the theme to the document body.
 *
 * @example
 * const { handleThemeChange, isDark, shade, setShade } = useTheme();
 * 
 * // Toggle theme
 * handleThemeChange();
 * 
 * // Set a new shade
 * setShade('blue');
 */

const useTheme = () => {
    // Retrieve the current theme from localStorage or document body className
    const currentTheme = (localStorage.getItem('theme') || document.body.className) as Themes;
    
    // Determine the mode (dark or light) based on the current theme
    const mode: Mode = (currentTheme.includes("dark-")) ? 'dark-' : 'light-';
    
    // State to track if the current theme is dark
    const [isDark, setIsDark] = useState<boolean>(mode === "dark-" ? true : false);
    
    // State to track the current shade of the theme
    const [shade, setShade] = useState<Shades>(((mode === "dark-") ? currentTheme.slice(5) : currentTheme.slice(6)) as Shades);

    // Function to toggle the theme between light and dark
    const handleThemeChange = () => {
        setIsDark((prev) => !prev);
    }

    // Apply the theme to the document body and persist it in localStorage
    useLayoutEffect(() => {
        if (isDark) {
            document.body.className = `dark-${shade}`;
            localStorage.setItem('theme', `dark-${shade}`);
        } else {
            document.body.className = `light-${shade}`;
            localStorage.setItem('theme', `light-${shade}`);
        }
    }, [isDark, shade]);

    // Return the theme management functions and states
    return { handleThemeChange, isDark, shade, setShade };
};

export default useTheme;