import React from "react";
import Buttons from "./buttons";

const FilterButton : React.FC = () => {

    return(
        <div className="w-8 h-8">
            <Buttons iconClassName="text-sm" withTransform={false} icon="filter" placeHolderClassName="hidden" className="h-full bg-[var(--text-secondary)]/60 w-full active:scale-95" />
        </div>
    )
};

export default FilterButton;