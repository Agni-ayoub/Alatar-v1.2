import { Company } from "../../../../features/sliceTypes";

export type Actions = {
    moreAction?: boolean;
    editAction?: boolean;
    deleteAction?: boolean;
};

/**
 * Interface representing the properties of a DataCard component.
 * --------------------------------------------------------------
 */
export interface DataCardProps {
    /**
     * The avatar of the company.
     * @type {Company["avatar"]}
     * @optional
     */
    avatar?: Company["avatar"];

    /**
     * The name of the company.
     * @type {Company["name"]}
     * @optional
     */
    title?: Company["name"];

    /**
     * The unique identifier of the company.
     * @type {Company["id"]}
     * @optional
     */
    id?: Company["id"];

    /**
     * The phone number of the company.
     * @type {Company["phone"]}
     * @optional
     */
    phone?: Company["phone"];

    /**
     * The email address of the company.
     * @type {Company["email"]}
     * @optional
     */
    email?: Company["email"];

    /**
     * The status or activity of the company.
     * @type {Company["status"]}
     * @optional
     */
    activity?: Company["status"];

    /**
     * The actions available for the DataCard.
     * @type {Actions}
     * @optional
     */
    actions?: Actions;
}