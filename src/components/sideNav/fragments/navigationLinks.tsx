import classNames from "classnames";
import { JSX } from "react";
import { NavLink } from "react-router-dom";
import { icons } from "../../../utils/icons";
import { RootRoute } from "../main/sideNavTypes";

interface NavigationLinksProps {
    route: RootRoute; // The route object containing route details (e.g., name, path, icon, etc.)
    isOpen: boolean; // Indicates if the sidebar is open
    isLocked: boolean; // Indicates if the sideBar is locked
}

/**
 * NavigationLinks Component
 ---------------------------
 * This component renders a single navigation link for a specific route in the sidebar.
 * It dynamically adjusts the appearance based on the open/locked state and highlights the active route.
 * 
 * @param {NavigationLinksProps} props - The props for the component.
 * @param {RootRoute} props.route - The route object containing route details.
 * @param {boolean} props.isOpen - Whether the sideNav is open.
 * @param {boolean} props.isLocked - Whether the sideNav is locked.
 * 
 * @returns {JSX.Element} - The JSX for the individual navigation link.
 */
const NavigationLinks = ({ route, isOpen, isLocked }: NavigationLinksProps): JSX.Element => {

    return (
        <NavLink
            to={route.path}
            className={({ isActive }) => (
                classNames(
                    "flex w-full h-10 transition-all duration-200 rounded-md",
                    {
                        'bg-[var(--background-secondary)]/50 pointer-events-none': isActive, // Style for active route
                        'hover:bg-[var(--background-secondary)]/20 active:bg-[var(--background-secondary)]/20 active:opacity-50 group cursor-pointe': !isActive, // Style for non-active route
                        'pl-4': isActive && (isOpen || isLocked), // Add padding when route is active and sidebar is open/locked
                    }
                )
            )}
            role="menuitem" // Define this element as a menu item for accessibility
            aria-label={route.name} // ARIA label for the route name
        >
            {/* Icon container */}
            <span
                className="flex text-xl items-center justify-center shrink-0 w-10 min-w-10 h-full"
                aria-hidden="true" // Icon is decorative and not relevant for screen readers
            >
                {icons[route.icon] || null} {/* Dynamically render the icon based on the route */}
            </span>

            {/* Sidebar text (Name of the route) */}
            <div
                className={classNames("transition-all duration-300 flex-1 h-full overflow-hidden", {
                    "max-w-0": !(isOpen || isLocked), // Hide the text if sidebar is collapsed
                    "max-w-3xs": isOpen || isLocked,  // Show text if sidebar is open/locked
                })}
                aria-expanded={isOpen || isLocked ? "true" : "false"} // ARIA expanded state for accessibility
            >
                <span
                    className={classNames(
                        "group-hover:pl-2 group-active:pl-3 whitespace-nowrap transition-all duration-300 h-full flex items-center text-sm tracking-[.2rem]",
                        {
                            "invisible opacity-0 -translate-x-3": !(isOpen || isLocked), // Hide the text when sidebar is closed
                            "translate-x-2 visible opacity-100": isOpen || isLocked,  // Show the text when sidebar is open/locked
                        }
                    )}
                    aria-hidden={!(isOpen || isLocked) ? "true" : "false"} // Hide from screen readers if collapsed
                >
                    {route.name} {/* The name of the route */}
                </span>
            </div>
        </NavLink>
    );
}

export default NavigationLinks;
