import React from "react";
import { JSX } from "react/jsx-runtime";
import DataCardHeader from "../fragments/dataCardHeader";
import DataCardBody from "../fragments/dataCardBody";
import DataCardActionButtons from "../fragments/dataCardActionButtons";
import { DataCardProps } from "./DataCardType";

const DataCard: React.FC<DataCardProps> = ({
    avatar,
    title = "Card Title",
    id = "id12345678910",
    phone = "+212 65 72 73 51",
    email = "emailexample@example.com",
    activity = "INACTIVE",
    actions = { moreAction: true, editAction: true, deleteAction: true },
}): JSX.Element => {

    return (
        <div className="flex items-center gap-4 flex-col bg-[var(--sideNav-background)] border border-[var(--text-secondary)] rounded-md h-[12rem] p-4" role="region" aria-labelledby="data-card-title">

            {/* Header */}
            <div className="flex overflow-clip w-full h-fit p-1 gap-2 items-center">
                {/* Avatar and Activity Indicator */}
                <DataCardHeader 
                    activity={activity}
                    avatar={avatar}
                    title={title}
                    id={id}
                />
            </div>
            
            {/* (Body) Contact Information */}
            <div className="flex gap-2 flex-col text-sm h-full">
                <DataCardBody 
                    phone={phone}
                    email={email}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-1">
                <DataCardActionButtons 
                    editAction={actions.editAction}
                    moreAction={actions.moreAction}
                    deleteAction={actions.deleteAction}
                    id={id}
                />
            </div>

        </div>
    );
};

export default DataCard;
