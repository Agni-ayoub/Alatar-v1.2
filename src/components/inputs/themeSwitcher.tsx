import React, { JSX } from "react";
import useTheme from "../../hooks/useTheme";


/**
 * ThemeSwitcher component allows users to toggle between light and dark themes.
 *
 * This component uses the `useTheme` hook to manage the theme state and handle theme changes.
 * It renders a switch input that toggles the theme when changed.
 *
 * @component
 * @example
 * return (
 *   <ThemeSwitcher />
 * )
 *
 * @returns {JSX.Element} The rendered ThemeSwitcher component.
 */
const ThemeSwitcher: React.FC = () : JSX.Element => {
    // Destructure handleThemeChange function and isDark state from useTheme hook
    const { handleThemeChange, isDark } = useTheme();

    return (
        <div className="flex">
            {/* Hidden SVG symbols for light and dark icons */}
            <svg className="hidden" display="none">
                <symbol id="light" viewBox="0 0 24 24">
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {/* Lines representing sun rays */}
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(0,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(45,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(90,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(135,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(180,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(225,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(270,12,12)" />
                        <line x1="12" y1="17" x2="12" y2="20" transform="rotate(315,12,12)" />
                    </g>
                    {/* Circle representing the sun */}
                    <circle fill="currentColor" cx="12" cy="12" r="5" />
                </symbol>
                <symbol id="dark" viewBox="0 0 24 24">
                    {/* Path representing the moon */}
                    <path fill="currentColor" d="M15.1,14.9c-3-0.5-5.5-3-6-6C8.8,7.1,9.1,5.4,9.9,4c0.4-0.8-0.4-1.7-1.2-1.4C4.6,4,1.8,7.9,2,12.5c0.2,5.1,4.4,9.3,9.5,9.5c4.5,0.2,8.5-2.6,9.9-6.6c0.3-0.8-0.6-1.7-1.4-1.2C18.6,14.9,16.9,15.2,15.1,14.9z" />
                </symbol>
            </svg>
            {/* Switch input for toggling theme */}
            <label className="switch">
                <input onChange={handleThemeChange} className="switch__input" type="checkbox" role="switch" name="dark" checked={isDark}/>
                {/* Light theme icon */}
                <svg className="switch__icon" width="24px" height="24px" aria-hidden="true">
                    <use href="#light" />
                </svg>
                {/* Dark theme icon */}
                <svg className="switch__icon" width="24px" height="24px" aria-hidden="true">
                    <use href="#dark" />
                </svg>
                <span className="switch__inner"></span>
                <span className="switch__inner-icons">
                    {/* Light theme icon inside switch */}
                    <svg className="switch__icon" width="24px" height="24px" aria-hidden="true">
                        <use href="#light" />
                    </svg>
                    {/* Dark theme icon inside switch */}
                    <svg className="switch__icon" width="24px" height="24px" aria-hidden="true">
                        <use href="#dark" />
                    </svg>
                </span>
                {/* Screen reader text */}
                <span className="switch__sr">Dark Mode</span>
            </label>
        </div>
    );
};

export default ThemeSwitcher;