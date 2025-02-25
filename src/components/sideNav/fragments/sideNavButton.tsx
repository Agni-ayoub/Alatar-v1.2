import React, { JSX } from "react";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

interface SideNavButtonProps {
    isOpen: boolean; // Indicates whether the sidebar is open
    isLocked: boolean; // Indicates whether the sidebar is locked
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle sidebar lock state
}

/**
 * SideNavButton Component
 * 
 * A button that controls the locking behavior of the sidebar. It toggles
 * between open and locked states and updates the parent component accordingly.
 *
 * @param {Object} SideNavButtonProps - The props for this component.
 * @param {boolean} props.isOpen - Indicates whether the sidebar is open.
 * @param {boolean} props.isLocked - Indicates whether the sidebar is locked.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsLocked - Function to toggle the lock state
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
 *     const [isOpen, setIsOpen] = useState(false);
 *
 *     return (
 *         <div className={`transition-all ${isLocked ? "ml-[16rem]" : "ml-0"}`}>
 *             <SideNavButton isOpen={isOpen} isLocked={isLocked} setIsLocked={setIsLocked} />
 *             - ... Other Components ... -
 *         </div>
 *     );
 * };
 *
 * export default Master;
 * ```
 * @returns {JSX.Element} - A button element to toggle sidebar lock state.
 */

const SideNavButton: React.FC<SideNavButtonProps> = ({ isOpen, isLocked, setIsLocked }: SideNavButtonProps) : JSX.Element => {
    return (
        <button
            onClick={() => setIsLocked((prev: boolean) => !prev)}
            className="rounded-full transition-transform w-fit h-fit p-2 text-2xl active:scale-90"
            aria-label={isLocked ? "Unlock sidebar" : "Lock sidebar"} // ARIA label for accessibility
            aria-pressed={isLocked} // Indicates the toggle state for screen readers
        >
            {!(isOpen || isLocked) ? <CgMenuLeft /> : <CgMenuRight />}
        </button>
    );
};

export default SideNavButton;
