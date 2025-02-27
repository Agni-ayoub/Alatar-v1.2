import { JSX, useEffect, useState } from "react";
import SideNavSubRoutes from "./sideNavSubRoutes";
import SideNavRoute from "./sideNavRoute";
import { Route } from "../main/sideNavTypes";

// Interface to define the expected props for NavigationLinksWithSubRoutes component
interface NavigationLinksWithSubRoutesProps {
    route: Route; // The route object containing route details
    isOpen: boolean; // Indicates if the navigation is open
    isLocked: boolean; // Indicates if the route is locked and cannot be interacted with
}

/**
 * NavigationLinksWithSubRoutes Component
 *-----------------------------------
 * This component renders the navigation links along with SubRoutes for a specific route. 
 * It controls the display of SubRoutes based on the route's state (locked/open).
 * 
 * @prop {Object} props - The props for the component.
 * @prop {Route} route - The route object containing route details (e.g., name, path, etc.).
 * @prop {boolean} isOpen - Indicates if the navigation is open.
 * @prop {boolean} isLocked - Indicates if the sideNav is locked.
 * 
 * @returns {JSX.Element} - Returns the JSX for the navigation section with links and SubRoutes.
 */

const NavigationLinksWithSubRoutes = ({ route, isOpen, isLocked }: NavigationLinksWithSubRoutesProps): JSX.Element => {
    // State to control the visibility of the room/SubRoutes
    const [showRoom, setShowRoom] = useState<boolean>(false);

    // Effect to control the visibility of the room based on open/locked state
    useEffect(() => {
        if (isLocked || isOpen) return; 
        setShowRoom(false); // Hide SubRoutes if not locked or open
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
                showRoom={showRoom} // Whether or not to show the SubRoutes
                isOpen={isOpen} // Navigation open state
                isLocked={isLocked} // Whether the route is locked or not
                setShowRoom={setShowRoom} // Function to update the state of showRoom
            />
            
            {/* SideNavSubRoutes Component renders the SubRoutes of the navigation */}
            <SideNavSubRoutes 
                route={route} // Passing the route data to SideNavSubRoutes
                showRoom={showRoom} // Controls the visibility of SubRoutes
            />
        </div>
    )
}

export default NavigationLinksWithSubRoutes;
