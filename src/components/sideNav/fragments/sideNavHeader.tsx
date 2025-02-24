import classNames from "classnames";
import React, { JSX } from "react";

// Props definition for SideNavHeader component
interface SideNavHeaderProps {
    isOpen: boolean; // Controls whether the sidebar is expanded
    isLocked: boolean; // If true, the sidebar stays open permanently
    placeHolder: string; // The text displayed in the header when the sidebar is open
    icon?: React.ReactNode; // Optional icon displayed in the header
    placeHolderSize?: 'smaller' | 'small' | 'fit' | 'gros' | 'logo'; // Font size options
    placeHolderColor?: 'primary' | 'secondary' | 'tertiary'; // Text color options
}

/**
 * SideNavHeader Component
 * 
 * This component represents the header of a sidebar navigation panel.
 * It displays an optional icon and placeholder text that is visible only when the sidebar is expanded.
 * 
 * @param {SideNavHeaderProps} props - Props object for the component.
 * @param {boolean} props.isOpen - Determines if the sidebar is open.
 * @param {boolean} props.isLocked - Prevents the sidebar from collapsing if true.
 * @param {string} props.placeHolder - The text displayed when the sidebar is open.
 * @param {React.ReactNode} [props.icon] - Optional icon displayed next to the text.
 * @param {'smaller' | 'small' | 'fit' | 'gros' | 'logo'} [props.placeHolderSize='fit'] - Controls text size.
 * @param {'primary' | 'secondary' | 'tertiary'} [props.placeHolderColor='primary'] - Controls text color.
 * @returns {JSX.Element} Side navigation header component.
 */

const SideNavHeader = ({
    isOpen,
    isLocked,
    placeHolder,
    icon,
    placeHolderColor = "primary",
    placeHolderSize = "fit",
}: SideNavHeaderProps) : JSX.Element => {

    // Tailwind-safe classes for dynamic text size and color
    const tailwindSafeList = {
        'primary': 'text-primary',
        'secondary': 'text-secondary',
        'tertiary': 'text-tertiary',
        'smaller': 'text-xs',
        'small': 'text-sm',
        'fit': 'text-md',
        'gros': 'text-xl',
        'logo': 'text-2xl font-semibold',
    };

    return (
        <div 
            className="flex gap-4 w-full h-10"
            role="banner" // Declares this as a header component
            aria-label="Side Navigation Header" // Provides context for assistive technologies
        >
            {/* Icon container */}
            <div 
                className="flex items-center justify-center shrink-0 w-10 min-w-10 h-full"
                aria-hidden={icon ? "false" : "true"} // Hides icon from screen readers if empty
            >
                {icon}
            </div>

            {/* Sidebar placeholder text */}
            <div 
                className={classNames("transition-all duration-300 flex-1 h-full overflow-hidden", {
                    'max-w-0': !(isOpen || isLocked),  // Collapse when sidebar is closed
                    'max-w-3xs': isOpen || isLocked,  // Expand when sidebar is open
                })}
                aria-expanded={isOpen || isLocked ? "true" : "false"} // Indicates if the text is visible
            >
                <span 
                    className={classNames(
                        "whitespace-nowrap duration-500 transition-all h-full flex tracking-widest items-center",
                        {
                            "invisible opacity-0 translate-x-10": !(isOpen || isLocked), // Hide if collapsed
                            "translate-x-0 visible opacity-100": isOpen || isLocked,  // Show if expanded
                            [tailwindSafeList[placeHolderColor]]: placeHolderColor, // Dynamic text color
                            [tailwindSafeList[placeHolderSize]]: placeHolderSize, // Dynamic font size
                        }
                    )}
                    aria-hidden={!(isOpen || isLocked) ? "true" : "false"} // Ensures hidden text is ignored
                >
                    {placeHolder}
                </span>
            </div>
        </div>
    );
};

export default SideNavHeader;
