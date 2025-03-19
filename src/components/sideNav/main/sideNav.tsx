import classNames from "classnames";
import React, { useMemo } from "react";
import logo from "../../../assets/logo/favicon.svg";
import SideNavHeader from "../fragments/sideNavHeader";
import SideNavBody from "../fragments/sideNavBody";
import routes from "../../../master/routes.json";
import SideNavBottom from "../fragments/sideNavBottom";
import { JSX } from "react/jsx-runtime";
import SideNavButton from "../fragments/sideNavButton";
import useSpecialRoute from "../../../hooks/useSpecialRoute";

type SideNavProps = React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    isLocked: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
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
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setIsLocked - Function to toggle locked sidebar state.
 */

const SideNav: React.FC<SideNavProps> = ({
    isOpen,
    isLocked,
    setIsOpen,
    setIsLocked,
    ...props
}: SideNavProps) : JSX.Element => {
    const { specialRoutes, id } = useSpecialRoute();
    const memoizedRoutes = useMemo(() => (id ? specialRoutes : routes), [id, specialRoutes]);

    return (
        <div
            role="navigation" // Marks this as a navigation component
            aria-label="Sidebar navigation" // Screen reader label
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={classNames(
                "sm:max-w-64 flex flex-col h-full sm:h-[calc(100%-2rem)] transition-all duration-200 rounded-lg fixed top-0 sm:top-4 left-0 sm:left-4 bg-[var(--sideNav-background)] shadow-[2px_2px_20px_var(--sideNav-shadow)] z-30 py-5 sm:py-2 sm:px-2 overflow-hidden select-none",
                {
                    "w-64": isOpen || isLocked, // Expanded width
                    "w-14": !(isOpen || isLocked), // Collapsed width
                    "max-w-64 px-2": isLocked,
                    "max-w-0": !isLocked,
                }
            )}
            {...props}
        >

            {/* Close Button */}
            <SideNavButton className="absolute text-secondary sm:hidden z-30 right-2 top-5" isLocked={isLocked} setIsLocked={setIsLocked} />

            {/* Sidebar Header */}
            <SideNavHeader
                isOpen={isOpen}
                isLocked={isLocked}
                placeHolder="Alatar"
                icon={<img className="w-9" src={logo} alt="Alatar Logo" />}
                placeHolderColor="secondary"
                placeHolderSize="logo"
            />

            {/* Separator */}
            <div className="px-2">
                <hr className="my-2 text-secondary" aria-hidden="true" /> {/* Decorative element, hidden from screen readers */}
            </div>

            {/* Sidebar Body (Navigation Items) */}
            <SideNavBody routes={memoizedRoutes} isLocked={isLocked} isOpen={isOpen} />

            {/* Sidebar Bottom (Logout Button) */}
            <SideNavBottom isLocked={isLocked} isOpen={isOpen} />
        </div>
    );
};

export default SideNav;
