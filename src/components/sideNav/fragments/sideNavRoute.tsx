import classNames from "classnames";
import React, { JSX } from "react";
import { icons } from "../../../master/icons";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Route } from "../sideNavTypes";

interface SideNavRouteProps {
    setShowRoom : React.Dispatch<React.SetStateAction<boolean>>;
    showRoom : boolean;
    isOpen : boolean;
    isLocked : boolean;
    route : Route;
}

/**
 * `SideNavRoute` Component
 * ------------------------
 * This component represents a single route in the sidebar.
 * It toggles visibility of nested routes when clicked.
 *
 * @prop {Function} setShowRoom - Function to toggle `showRoom` state.
 * @prop {boolean} showRoom - Controls whether nested routes are shown.
 * @prop {boolean} isOpen - Determines if the sidebar is open.
 * @prop {boolean} isLocked - Determines if the sidebar is locked open.
 * @prop {Route} route - The route data containing name, path, and icon.
 * @returns {JSX.Element} A sidebar navigation item.
 */
const SideNavRoute = ({ setShowRoom, showRoom, isOpen, isLocked, route} : SideNavRouteProps) : JSX.Element => {
    return (
        <div 
            onClick={() => setShowRoom((prev : boolean) => !prev)}
            className={classNames(
                "flex w-full items-center h-10 transition-all duration-200 rounded-md group cursor-pointer",
                "hover:bg-[var(--background-secondary)]/20 active:bg-[var(--background-secondary)]/20 active:opacity-50",
                {
                    'outline-1 text-secondary': showRoom,
                }
            )}
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
            {
                (isOpen || isLocked) && (
                    <span className="pr-2">
                        {showRoom ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                )
            }
        </div>
    );
};

export default SideNavRoute;