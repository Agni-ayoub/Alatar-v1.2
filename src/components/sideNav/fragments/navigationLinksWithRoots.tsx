import { JSX, useEffect, useState } from "react";
import SideNavRoots from "./sideNavRoots";
import SideNavRoute from "./sideNavRoute";
import { Route } from "../main/sideNavTypes";

// Interface to define the expected props for NavigationLinksWithRoots component
interface NavigationLinksWithRootsProps {
    route: Route; // The route object containing route details
    isOpen: boolean; // Indicates if the navigation is open
    isLocked: boolean; // Indicates if the route is locked and cannot be interacted with
}

/**
 * NavigationLinksWithRoots Component
 *-----------------------------------
 * This component renders the navigation links along with roots for a specific route. 
 * It controls the display of roots based on the route's state (locked/open).
 * 
 * @prop {Object} props - The props for the component.
 * @prop {Route} route - The route object containing route details (e.g., name, path, etc.).
 * @prop {boolean} isOpen - Indicates if the navigation is open.
 * @prop {boolean} isLocked - Indicates if the sideNav is locked.
 * 
 * @returns {JSX.Element} - Returns the JSX for the navigation section with links and roots.
 */

const NavigationLinksWithRoots = ({ route, isOpen, isLocked }: NavigationLinksWithRootsProps): JSX.Element => {
    // State to control the visibility of the room/roots (in this case, the root nodes of the navigation).
    const [showRoom, setShowRoom] = useState<boolean>(false);

    // Effect to control the visibility of the room based on open/locked state
    useEffect(() => {
        if (isLocked || isOpen) return; 
        setShowRoom(false); // Hide roots if not locked or open
    }, [isLocked, isOpen]);

    return (
        <div
            className="flex flex-col"
            aria-label={route.name} // ARIA label for the section, describing the route
            role="menuitem" // Defines this div as a menu item for accessibility purposes
        >
            {/* SideNavRoute Component renders the individual route link */}
            <SideNavRoute 
                route={route} // Passing route data to SideNavRoute
                showRoom={showRoom} // Whether or not to show the roots
                isOpen={isOpen} // Navigation open state
                isLocked={isLocked} // Whether the route is locked or not
                setShowRoom={setShowRoom} // Function to update the state of showRoom
            />
            
            {/* SideNavRoots Component renders the roots of the navigation */}
            <SideNavRoots 
                route={route} // Passing the route data to SideNavRoots
                showRoom={showRoom} // Controls the visibility of roots
            />
        </div>
    )
}

export default NavigationLinksWithRoots;
