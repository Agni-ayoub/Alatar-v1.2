import React, { ReactNode } from "react";
import Buttons from "../../components/buttons/buttons";
import { icons } from "../../utils/icons";
import classNames from "classnames";
import { JSX } from "react/jsx-runtime";

interface DataCardProps {
    avatar? : ReactNode;
    title? : string;
    id? : string;
    phone? : string;
    email?: string;
    activity?: 'active' | 'inactive';
}

/**
 * DataCard component displays a card with information including avatar, title, id, phone, email, and activity status.
 * 
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.avatar - The avatar to be displayed in the card.
 * @param {string} [props.title="Card Title"] - The title of the card.
 * @param {string} [props.id="card id"] - The id of the card.
 * @param {string} [props.phone="+212 65 72 73 51"] - The phone number to be displayed.
 * @param {string} [props.email="emailexample@example.com"] - The email to be displayed.
 * @param {string} [props.activity="inactive"] - The activity status, can be "active" or "inactive".
 * 
 * @returns {JSX.Element} The rendered DataCard component.
 */

const DataCard: React.FC<DataCardProps> = ({ avatar, title = "Card Title", id = "id12345678910", phone = "+212 65 72 73 51", email = "emailexample@example.com", activity = "inactive" }) : JSX.Element => {

    return(
        <div className="flex min-w-max shadow-[0_2px_8px_var(--text-secondary)] items-center gap-4 flex-col bg-[var(--sideNav-background)] border border-[var(--text-secondary)] rounded-md h-[12rem] p-4">
            {/* Avatar and status indicator */}
            <div className="flex w-full h-fit gap-2 items-center">
                <span className={classNames("relative border border-[var(--text-secondary)] w-10 h-10 rounded-md",
                    {
                        'bg-[var(--background)]' : !avatar,
                    }
                )}>
                    {avatar}
                    <span className={classNames("absolute rounded-full w-3 h-3 -top-1 -right-1",
                    {
                        'bg-[var(--negative)]' : activity === "inactive",
                        'bg-[var(--positive)]' : activity === "active"
                    }
                    )}/>
                </span>
                {/* Title and ID */}
                <div className="flex flex-col gap-1">
                    <span className="tracking-widest text-lg font-semibold">
                    {title}
                    </span>
                    <span className="text-xs tracking-widest">
                    {id}
                    </span>
                </div>
            </div>
            {/* Contact information */}
            <div className="flex gap-2 flex-col text-sm h-full">
                <span className="flex gap-1 items-center">
                    {icons['phone']} {phone}
                </span>
                <span className="flex gap-1 items-center">
                    {icons['email']} {email}
                </span>
            </div>
            {/* Action buttons */}
            <div className="flex h-7 w-full gap-1">
                <Buttons className="bg-[var(--text-secondary)]/80" placeHolder="More" />
                <Buttons className="bg-[var(--positive)]/80" placeHolder="Edit" />
                <Buttons className="bg-[var(--negative)]/80" placeHolder="Delete" />
            </div>
        </div>
    )
}

export default DataCard;