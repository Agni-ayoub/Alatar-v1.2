import classNames from "classnames";
import { icons } from "../../../master/icons";
import { JSX } from "react";
import { NavLink } from "react-router-dom";

// Types for sub-routes (nested routes)
interface RootRoute {
    name: string; // Name of the sub-route
    path: string; // URL path of the sub-route
    icon: string; // Icon name as a string (used for dynamic imports)
}

// Types for main routes in the sidebar
interface Route {
    name: string; // Display name of the route
    path: string; // URL path of the route
    icon: string; // Icon name as a string (used for dynamic imports)
    roots?: RootRoute[]; // Optional array of sub-routes
}

// Props definition for the SideNavBody component
interface SideNavProps {
    routes?: Route[]; // Optional array of route objects
    isOpen: boolean;  // Determines if the sidebar is expanded
    isLocked: boolean; // Determines if the sidebar is permanently expanded
}

/**
 * SideNavBody Component
 * 
 * Displays the sidebar navigation links dynamically based on the given `routes` prop.
 * It also adjusts styling based on whether the sidebar is open (`isOpen`) or locked (`isLocked`).
 * 
 * @param {SideNavProps} props - Props object for the component
 * @param {Route[]} [props.routes=[]] - List of sidebar routes with names, paths, and icons
 * @param {boolean} props.isOpen - Determines if the sidebar is expanded
 * @param {boolean} props.isLocked - Determines if the sidebar is permanently expanded
 * @param {string} [props.activePath] - Currently active route path for styling
 * @returns {JSX.Element} Sidebar navigation component
 */

const SideNavBody = ({ routes = [], isOpen, isLocked }: SideNavProps): JSX.Element => {
    return (
        <nav
            className="flex-1 shrink-0 py-2 flex flex-col text-primary gap-2"
            role="navigation"
            aria-label="Sidebar Navigation"
        >
            {
                routes.map((route, i) => {

                    return (
                        <NavLink
                            to={route.path}
                            key={'routes' + i}
                            className={classNames(
                            "flex w-full h-10 cursor-pointer transition-all duration-200 rounded-md hover:bg-[var(--background-secondary)]/20 active:opacity-50 group")}
                            role="menuitem"
                            aria-label={route.name}
                        >
                            {/* Icon container */}
                            <span
                                className="flex text-xl items-center justify-center shrink-0 w-10 min-w-10 h-full"
                                aria-hidden="true" // Icon is decorative
                            >
                                {icons[route.icon] || null} {/* Dynamically render icon */}
                            </span>

                            {/* Sidebar text (Name of the route) */}
                            <div
                                className={classNames("transition-all duration-300 flex-1 h-full overflow-hidden", {
                                    "max-w-0": !(isOpen || isLocked),  // Hide text if sidebar is closed
                                    "max-w-3xs": isOpen || isLocked,  // Show text if sidebar is open/locked
                                })}
                                aria-expanded={isOpen || isLocked ? "true" : "false"}
                            >
                                <span
                                    className={classNames(
                                        "group-hover:pl-2 group-active:pl-3 whitespace-nowrap transition-all duration-300 h-full flex items-center text-sm tracking-[.2rem]",
                                        {
                                            "invisible opacity-0 -translate-x-3": !(isOpen || isLocked), // Hide text if sidebar is closed
                                            "translate-x-2 visible opacity-100": isOpen || isLocked,  // Show text if sidebar is open/locked
                                        }
                                    )}
                                    aria-hidden={!(isOpen || isLocked) ? "true" : "false"} // Hide from screen readers if collapsed
                                >
                                    {route.name}
                                </span>
                            </div>
                        </NavLink>
                    );
                })
            }
        </nav>
    );
};

export default SideNavBody;
