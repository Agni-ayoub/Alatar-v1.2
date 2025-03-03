import classNames from 'classnames';
import React from 'react';
import usePreloadedImage from '../../../../hooks/usePreloadedImage';
import { DataCardProps } from '../main/DataCardType';
import { Tooltip } from "react-tooltip";

const DataCardHeader: React.FC<DataCardProps> = ({ avatar, activity, id, title }) => {
    const { imageElement } = usePreloadedImage({ src: avatar || "", alt: "company" });

    return (
        <>
            <span
                className={classNames(
                "relative z-0 shrink-0 flex items-center justify-center border border-[var(--text-secondary)] w-10 h-10 rounded-md group",
                { 'bg-[var(--background)]': !avatar }
                )}
                role="img"
                aria-label="Company avatar"
            >
                {imageElement}
                <span
                data-tooltip-id={`data-card-tooltip-${id}`}
                data-tooltip-content={activity}
                className={classNames(
                    "absolute rounded-full w-3 h-3 -top-1 -right-1 border",
                    {
                    'bg-[var(--negative)]': activity === "INACTIVE",
                    'bg-[var(--positive)]': activity === "ACTIVE",
                    }
                )}
                aria-label={activity === "INACTIVE" ? "Inactive" : "Active"}
                />
            </span>
            {/* Title and ID */}
            <ul className="flex overflow-hidden flex-col gap-1">
                <li 
                data-tooltip-id={`data-card-tooltip-${id}`}
                data-tooltip-content={"Company : " + title}
                data-tooltip-place="top"
                id="data-card-title" className="tracking-widest text-lg truncate overflow-hidden font-semibold whitespace-nowrap">
                    {title} 
                </li>
                <li 
                data-tooltip-id={`data-card-tooltip-${id}`}
                data-tooltip-content={"ID : " + id}
                data-tooltip-place="top"
                className="text-xs whitespace-nowrap overflow-hidden truncate tracking-widest">
                    {id}
                </li>
            </ul>
            {/* Tooltip */}
            <Tooltip 
                opacity={8}
                id={`data-card-tooltip-${id}`} 
                style={{ backgroundColor: "var(--tooltip-background)", color: "var(--text-primary)", "zIndex" : 10}}
                delayHide={200}
                place="right"
            />
        </>
    );
};

export default DataCardHeader;