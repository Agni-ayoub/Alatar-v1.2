import React from "react";
import Buttons from "../../components/buttons/buttons";
import { icons } from "../../utils/icons";
import classNames from "classnames";
import { JSX } from "react/jsx-runtime";
import usePreloadedImage from "../../hooks/usePreloadedImage";
import { Company } from "../../features/sliceTypes";

type Actions = {
    more?: boolean;
    edit?: boolean;
    delete?: boolean;
};

interface DataCardProps {
    avatar?: string;
    title?: string;
    id?: string;
    phone?: string;
    email?: string;
    activity?: Company["status"];
    actions?: Actions;
}

const DataCard: React.FC<DataCardProps> = ({
    avatar,
    title = "Card Title",
    id = "id12345678910",
    phone = "+212 65 72 73 51",
    email = "emailexample@example.com",
    activity = "INACTIVE",
    actions = { more: true, edit: true, delete: true },
}): JSX.Element => {
    const { imageElement } = usePreloadedImage({ src: avatar || "", alt: "company" });

    return (
        <div className="flex shadow-[0_2px_8px_var(--text-secondary)] items-center gap-4 flex-col bg-[var(--sideNav-background)] border border-[var(--text-secondary)] rounded-md h-[12rem] p-4">
            <div className="flex overflow-clip w-full h-fit gap-2 items-center">
                <span
                    className={classNames(
                        "relative shrink-0 flex items-center justify-center border border-[var(--text-secondary)] w-10 h-10 rounded-md",
                        { 'bg-[var(--background)]': !avatar }
                    )}
                >
                    {imageElement}
                    <span
                        className={classNames(
                            "absolute rounded-full w-3 h-3 -top-1 -right-1 border",
                            {
                                'bg-[var(--negative)]': activity === "INACTIVE",
                                'bg-[var(--positive)]': activity === "ACTIVE",
                            }
                        )}
                    />
                </span>
                <div className="flex text-ellipsis overflow-hidden flex-col gap-1">
                    <span className="tracking-widest text-lg text-ellipsis overflow-hidden font-semibold whitespace-nowrap">
                        {title}
                    </span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis tracking-widest">
                        {id}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 flex-col text-sm h-full">
                <span className="flex gap-1 items-center">
                    {icons['phone']} {phone}
                </span>
                <span className="flex gap-1 items-center">
                    {icons['email']} {email}
                </span>
            </div>
            <div className="flex h-7 w-full gap-1">
                {actions.more && <Buttons className="bg-[var(--text-secondary)]/80" placeHolder="More" />}
                {actions.edit && <Buttons className="bg-[var(--positive)]/80" placeHolder="Edit" />}
                {actions.delete && <Buttons className="bg-[var(--negative)]/80" placeHolder="Delete" />}
            </div>
        </div>
    );
};

export default DataCard;
