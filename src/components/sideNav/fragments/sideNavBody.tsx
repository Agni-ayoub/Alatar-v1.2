import { JSX } from "react";
import NavigationLinks from "./navigationLinks";
import NavigationLinksWithSubRoutes from "./navigationLinksWithSubRoutes";
import { Route } from "../main/sideNavTypes";


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
                routes.map((route, key) => {

                    return (
                        !route.subRoute?
                            <NavigationLinks
                                key={key}
                                route={route}
                                isLocked={isLocked}
                                isOpen={isOpen}
                            />:
                            <NavigationLinksWithSubRoutes 
                                key={key}
                                route={route}
                                isLocked={isLocked}
                                isOpen={isOpen}
                            />
                    );
                })
            }
        </nav>
    );
};

export default SideNavBody;
