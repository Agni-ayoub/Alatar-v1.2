import classNames from "classnames";
import React from "react";

interface SideNavHeaderProps {
    isOpen: boolean;
    isLocked: boolean;
    placeHolder: string;
    icon?: React.ReactNode;
    placeHolderSize?: 'smaller' | 'small' | 'fit' | 'gros' | 'logo';
    placeHolderColor?: 'primary' | 'secondary' | 'tertiary';
}

/**
 * SideNavHeader component displays a navigation header with an optional icon and customizable text.
 * The header's visibility and text styling can be adjusted based on the provided props.
 *
 * @param {boolean} [isOpen=false] - State that controls whether the sidebar is open. If true, the sidebar expands.
 * @param {boolean} [isLocked=false] - State that locks the sidebar in an open state, preventing it from collapsing.
 * @param {string} placeHolder - The text displayed in the header when the sidebar is open.
 * @param {React.ReactNode} [icon] - Optional icon displayed in the header alongside the placeholder text.
 * @param {'smaller' | 'small' | 'fit' | 'gros' | 'logo'} [placeHolderSize='fit'] - Determines the font size of the placeholder text. 
 *    - 'smaller': Extra small font.
 *    - 'small': Small font.
 *    - 'fit': Medium font (default).
 *    - 'gros': Large font.
 *    - 'logo': Larger font with bold styling.
 * @param {'primary' | 'secondary' | 'tertiary'} [placeHolderColor='primary'] - Defines the color of the placeholder text.
 *    - 'primary': Primary color.
 *    - 'secondary': Secondary color.
 *    - 'tertiary': Tertiary color (default is primary).
 */
const SideNavHeader = ({
    isOpen,
    isLocked,
    placeHolder,
    icon,
    placeHolderColor = "primary",
    placeHolderSize = "fit",
}: SideNavHeaderProps) => {

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
            role="navigation" // Indicates that this is a navigation header
            aria-label="Side Navigation Header" // Provides context for screen readers
        >
            <div 
                className="flex items-center justify-center shrink-0 w-8 min-w-8 h-full"
                aria-hidden={icon ? "false" : "true"} // Ensures icon is accessible if provided
            >
                {icon}
            </div>
            <div 
                className={classNames("transition-all duration-300 flex-1 h-full overflow-hidden", {
                    'max-w-0': !(isOpen || isLocked),
                    'max-w-3xs': isOpen || isLocked,
                })}
                aria-expanded={isOpen || isLocked ? "true" : "false"} // Indicates whether the header is expanded or collapsed
            >
                <span 
                    className={classNames('whitespace-nowrap duration-500 transition-all h-full flex tracking-widest items-center', {
                        'invisible opacity-0 translate-x-10': !(isOpen || isLocked),
                        'translate-x-0 visible opacity-100': isOpen || isLocked,
                        [tailwindSafeList[placeHolderColor]]: placeHolderColor,
                        [tailwindSafeList[placeHolderSize]]: placeHolderSize,
                    })}
                    aria-hidden={!(isOpen || isLocked) ? "true" : "false"} // Hides the placeholder when the sidebar is collapsed
                >
                    {placeHolder}
                </span>
            </div>
        </div>
    );
};

export default SideNavHeader;
