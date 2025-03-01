import classNames from "classnames";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";
import useLogOut from "../../../hooks/useLogOut";

/**
 * SideNavBottom component represents the bottom section of the sidebar,
 * typically used for the logout button. It adapts to the sidebar's open
 * or closed state, showing or hiding text accordingly.
 *
 * @prop {boolean} isOpen - Controls whether the sidebar is expanded.
 * @prop {boolean} isLocked - Determines if the sidebar is locked open.
 */
interface SideNavBottomProps {
    isOpen: boolean;
    isLocked: boolean;
}

/**
 * Renders the logout button inside the sidebar.
 * The button expands when the sidebar is open or locked and collapses when closed.
 *
 * @param {SideNavBottomProps} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 */
const SideNavBottom = ({ isOpen, isLocked }: SideNavBottomProps) : JSX.Element => {
    const { handleLogOut, isLoading } = useLogOut();

    return (
        <div 
            className="h-10 flex shrink-0 items-center"
            role="navigation" // Declares this section as part of the navigation
            aria-label="Sidebar bottom section" // Provides an accessible label for screen readers
        >
            <button
                disabled={isLoading} // Disables the button when the user is logging out
                onClick={() => handleLogOut(true)} // Calls the logout function when the button is clicked
                className={classNames("bg-logout-button overflow-hidden flex items-center rounded-md h-full w-full group text-logout hover:opacity-80 active:opacity-50 cursor-pointer disabled:pointer-events-none disabled:bg-[var(--text-tertiary)]/20 transition-opacity duration-300",
                    {
                        'justify-center' : isLoading
                    }
                )}
                aria-disabled={isLoading ? "true" : "false"} // Disables the button for screen readers when loading
                aria-busy={isLoading ? "true" : "false"} // Indicates the button is busy when loading
                aria-label="Logout" // Provides a meaningful label for the button
            >
                
                {
                    isLoading ? (
                        // Loader
                        <span className="button-loader"/>
                    ) : (
                        <>
                            {/* Logout Icon */}
                            <span
                                className="flex shrink-0 items-center justify-center w-10 h-full"
                                aria-hidden="false" // Icon is always visible, so it should be accessible
                            >
                                <CiLogout className="text-2xl" />
                            </span>
            
                            {/* Logout Text (Hidden when sidebar is closed) */}
                            <span
                                className={classNames(
                                    "group-hover:pl-2 group-active:pl-3 whitespace-nowrap transition-all duration-300 font-semibold h-full flex items-center tracking-[.2rem]",
                                    {
                                        "invisible opacity-0 -translate-x-8": !(isOpen || isLocked), // Hide text if sidebar is collapsed
                                        "translate-x-2 visible opacity-100": isOpen || isLocked, // Show text if sidebar is open or locked
                                    }
                                )}
                                aria-hidden={!(isOpen || isLocked) ? "true" : "false"} // Hide from screen readers if collapsed
                            >
                                Logout
                            </span>
                        </>
                    )
                }
            </button>
        </div>
    );
};

export default SideNavBottom;