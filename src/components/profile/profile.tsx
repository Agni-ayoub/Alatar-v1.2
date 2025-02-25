import { CiUser } from "react-icons/ci";
import { MdMoreHoriz } from "react-icons/md";
import { JSX } from "react/jsx-runtime";

/**
 * Props for the Profile component.
 */
interface ProfileProps {
    username?: string;
    email?: string;
    avatar?: JSX.Element;
}

/**
 * Profile Component
 * 
 * Displays a user profile icon that, when hovered, reveals a dropdown with the username, email and avatar.
 * 
 * @prop {username : string} props - User's first & last name.
 * @prop {email : string} props - User's Email.
 * @prop {avatar : JSX.Element} props - User's Avatar.
 * @returns {JSX.Element} - A profile icon with a dropdown tooltip.
 * 
 * @example
 * ```tsx
 * <Profile username="John Doe" email="john@example.com" avatar={<img src={<"User's avatar">} />} />
 * ```
 */
const Profile = ({ username, email, avatar }: ProfileProps): JSX.Element => {
    return (
        <div 
            className="flex items-center justify-center w-8 h-8 rounded-md bg-[var(--background-secondary)]/10 relative"
            aria-haspopup="true" // Indicates a popup-like menu is associated with this element
            aria-expanded="false" // By default, the menu is not expanded
        >
            {/* User Icon */}
            <button className="peer">
                {
                    avatar?
                        avatar:
                        <CiUser className="text-2xl" aria-hidden="true" />
                }  
            </button>

            {/* Tooltip Dropdown */}
            <div 
                className="invisible absolute top-8 right-8 rounded-md rounded-tr-none bg-[var(--background-secondary)]/30 w-0 h-0  overflow-hidden peer-focus-within:delay-0 delay-150 peer-focus-within:visible peer-focus-within:w-[15rem] peer-focus-within:h-[6rem] transition-all duration-200"
                role="dialog" // Marks this as a dialog-like tooltip
                aria-label="User profile details"
            >
                {/* Content Inside Tooltip */}
                <div 
                    className="flex p-2 flex-col justify-between h-full"
                    aria-live="polite" // Ensures screen readers announce content updates
                >
                    {/* User Info Section */}
                    <div className="flex bg-[var(--background)] p-1 flex-col rounded-md">
                        <span className="text-sm" aria-label={`Username: ${username || "username"}`}>
                            {username || "username"}
                        </span>
                        <span className="text-xs overflow-hidden text-ellipsis text-tertiary" aria-label={`Email: ${email || "example@example.com"}`}>
                            {email || "example@example.com"}
                        </span>
                    </div>

                    {/* Details Button */}
                    <button 
                        className="flex items-center gap-2 justify-center bg-[var(--background)] active:border text-sm text-secondary rounded-md"
                        aria-label="View profile details"
                    >
                        More <MdMoreHoriz aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;