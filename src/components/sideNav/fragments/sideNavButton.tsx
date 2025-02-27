import classNames from "classnames";
import React, { JSX } from "react";
import Buttons from "../../buttons/buttons";

interface SideNavButtonProps {
    isLocked: boolean; // Indicates whether the sidebar is locked
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle sidebar lock state
    className?: string; //styling class for the button (overrides everything);
}

/**
 * SideNavButton Component
 * 
 * A button that controls the locking behavior of the sidebar. It toggles
 * between open and locked states and updates the parent component accordingly.
 *
 * @param {Object} SideNavButtonProps - The props for this component.
 * @param {boolean} props.isLocked - Indicates whether the sidebar is locked.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsLocked - Function to toggle the lock state.
 * @param {string} props.className - Button's className (OverRides everything !).
 * 
 * @returns {JSX.Element} - A button element to toggle sidebar lock state.
 * 
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import SideNavButton from "./SideNavButton";
 *
 * const Master = () => {
 *     const [isLocked, setIsLocked] = useState(false);
 *
 *     return (
 *         <div className={`transition-all ${isLocked ? "ml-[16rem]" : "ml-0"}`}>
 *             <SideNavButton className="<new styles>" isLocked={isLocked} setIsLocked={setIsLocked} />
 *             - ... Other Components ... -
 *         </div>
 *     );
 * };
 *
 * export default Master;
 * ```
 * @returns {JSX.Element} - A button element to toggle sidebar lock state.
 */

const SideNavButton: React.FC<SideNavButtonProps> = ({ isLocked, setIsLocked, className }: SideNavButtonProps) : JSX.Element => {
    return (
        <Buttons 
            onClick={() => setIsLocked((prev: boolean) => !prev)}
            className={classNames("rounded-full transition-transform w-fit h-fit p-2 text-2xl active:scale-90 bg-transparent", className)}
            aria-label={isLocked ? "Unlock sidebar" : "Lock sidebar"} // ARIA label for accessibility
            aria-pressed={isLocked} // Indicates the toggle state for screen readers
            icon={!isLocked ? "sideNavClosed" : "sideNavOpen"}
            placeHolderClassName="hidden"
            withTransform={false}
        />
    );
};

export default SideNavButton;
