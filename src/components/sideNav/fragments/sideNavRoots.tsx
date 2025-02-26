import classNames from "classnames";
import { icons } from "../../../master/icons";
import { NavLink } from "react-router-dom";
import { JSX } from "react";
import { Route } from "../sideNavTypes";

// Props interface for the `SideNavRoots` component
interface SideNavRootsProps {
    showRoom: boolean; // Controls whether sub-routes should be expanded or collapsed
    route: Route; // The route containing sub-routes
}

/**
 * `SideNavRoots` Component
 * ------------------------
 * This component renders a list of sub-routes (nested routes) under a main sidebar route.
 * It expands or collapses based on the `showRoom` prop.
 *
 * @prop {boolean} prop.showRoom - Determines if the sub-routes should be visible.
 * @prop {Route} prop.route - The main route containing sub-routes.
 * @returns {JSX.Element} A collapsible navigation section for nested routes.
 */

const SideNavRoots = ({ showRoom, route }: SideNavRootsProps): JSX.Element => {
    return (
        <div 
            className={classNames(
                "overflow-hidden flex flex-col w-full transition-all duration-500", 
                {
                    'max-h-0': !showRoom, // Collapse when `showRoom` is false
                    'max-h-96': showRoom, // Expand when `showRoom` is true
                }
            )} 
            aria-hidden={!showRoom} // Hide from screen readers when collapsed
        >
            {
                route.roots?.map((root, index) => (
                    <NavLink 
                        key={index} 
                        to={root.path}
                        style={{ transitionDelay: `${index * 100}ms` }} // Staggered animation delay
                        className={({ isActive }) => classNames(
                            "text-sm px-1 py-2 w-full h-fit tracking-widest group transition-all duration-200",
                            {
                                'pl-7': showRoom, // Indent when expanded
                                'pl-12 pointer-events-none': isActive && showRoom, // More indentation when active
                                'text-secondary': isActive, // Active route text color
                            }
                        )}
                        aria-current={showRoom ? "page" : undefined} // ARIA support for active route
                    >
                        <div className="flex items-center">
                            {/* Icon container */}
                            <span
                                className="flex text-lg items-center justify-center shrink-0 w-10 min-w-10 h-full"
                                aria-hidden="true" // Decorative icon, not read by screen readers
                            >
                                {icons[root.icon] || root.icon || null} {/* Render dynamic icon */}
                            </span>
                            
                            {/* Sub-route text */}
                            <span
                                className="group-hover:pl-2 group-active:pl-3 whitespace-nowrap transition-all duration-300 h-full flex items-center text-xs tracking-[.2rem]"
                                aria-hidden={!showRoom} // Hide text when collapsed
                            >
                                {root.name}
                            </span>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    );
};

export default SideNavRoots;
