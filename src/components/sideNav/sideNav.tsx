import classNames from "classnames";
import React from "react";
import logo from "../../assets/logo/favicon.svg";
import SideNavHeader from "./fragments/sideNavHeader";
import SideNavBody from "./fragments/sideNavBody";
import routes from "../../master/routes.json";
import SideNavBottom from "./fragments/sideNavButton";

type SideNavProps = React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    isLocked: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolderSize?: "smaller" | "small" | "fit" | "gros" | "logo";
    placeHolderColor?: "primary" | "secondary" | "tertiary";
};

/**
 * SideNav component is a vertical sidebar navigation.
 * It expands on hover unless locked open, and contains a header, navigation items, and a footer.
 *
 * @param {SideNavProps} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 * 
 * Props for the SideNav component.
 *
 * @prop {boolean} isOpen - Controls whether the sidebar is expanded.
 * @prop {boolean} isLocked - Determines if the sidebar is locked open.
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to toggle sidebar state.
 * @prop {'smaller' | 'small' | 'fit' | 'gros' | 'logo'} [placeHolderSize] - Controls text size in the header.
 * @prop {'primary' | 'secondary' | 'tertiary'} [placeHolderColor] - Controls text color in the header.
 */

const SideNav: React.FC<SideNavProps> = ({
    isOpen = false,
    isLocked = false,
    setIsOpen,
    ...props
}) => {
    return (
        <div
            role="navigation" // Marks this as a navigation component
            aria-label="Sidebar navigation" // Screen reader label
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={classNames(
                "flex flex-col h-[calc(100%-2rem)] transition-all duration-200 rounded-lg fixed top-4 left-4 bg-[var(--sideNav-background)] shadow-[2px_2px_20px_var(--sideNav-shadow)] z-30 py-2 px-2 overflow-hidden select-none",
                {
                    "w-64": isOpen || isLocked, // Expanded width
                    "w-14": !(isOpen || isLocked), // Collapsed width
                }
            )}
            {...props}
        >
            {/* Sidebar Header */}
            <SideNavHeader
                isOpen={isOpen}
                isLocked={isLocked}
                placeHolder="Alatar"
                icon={<img className="w-9" src={logo} alt="Alatar Logo" />} // Added alt text for accessibility
                placeHolderColor="secondary"
                placeHolderSize="logo"
            />

            {/* Separator */}
            <div className="px-2">
                <hr className="my-2 text-secondary" aria-hidden="true" /> {/* Decorative element, hidden from screen readers */}
            </div>

            {/* Sidebar Body (Navigation Items) */}
            <SideNavBody routes={routes} isLocked={isLocked} isOpen={isOpen} />

            {/* Sidebar Bottom (Logout Button) */}
            <SideNavBottom isLocked={isLocked} isOpen={isOpen} />
        </div>
    );
};

export default SideNav;
